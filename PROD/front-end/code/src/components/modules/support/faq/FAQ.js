import React, { useContext, useEffect, useState } from "react";
import Page from "../../../Interface/page/Page";
import TextInput from "../../../Interface/inputs/textInput/TextInput";
import useInput from "../../../hooks/useInput";
import sortByField from "../../../../functions/array/sortByField";
import Question from "./question/Question";
import Button from "../../../Interface/buttons/button/Button";
import ModalContext from "../../../context/modalContext/ModalContext";
import AskQuestion from "./AskQuestion/AskQuestion";
import TextNavbar from "../../../Interface/navigation/textNavbar/TextNavbar";
import Banner from "../../../Interface/banner/Banner";
import { useSearchParams } from "react-router-dom";
import LoadableContent from "../../../Interface/containers/loadableContent/LoadableContent";
import FetcherContext from "../../../context/fetcherContext/FetcherContext";
import wordsSplitter from "../../../../functions/text/wordsSplitter";
import Header from "../../../Interface/header/Header";
import NoDataFound from "../../../Interface/noDataFound/NoDataFound";
import style from './FAQ.module.css';

function FAQ(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [faqData, setFaqData] = useState();
    const [maxMatches, setMaxMatches] = useState(0);
    const [selectedSubject, setSelectedSubject] = useState(searchParams.get('subject') || 'Account Settings');
    const [subjectOptions, setSubjectOptions] = useState([]);
    const modalCtx = useContext(ModalContext);
    const fetcher = useContext(FetcherContext);

    const search = useInput({
        name: 'search',
        initialValue: searchParams.get('search') || ''
    });

    useEffect(() => {
        fetchFaqData();
    }, []);

    useEffect(() => {
        if(searchParams.get('subject')) searchParams.delete('subject');
        if(searchParams.get('search')) searchParams.delete('search');
        setSearchParams(searchParams);
    }, []);

    useEffect(() => {
        if(faqData) {
            setFaqData(curSt => {
                const [data, maxMatches] = applySearch(structuredClone(curSt));
                setMaxMatches(maxMatches);
                return data;
            });
        }
    }, [search.value]);

    useEffect(() => {
        if(faqData) {
            const subjects = faqData.reduce((subjects, faq) => {
                const toAdd = search.value
                    ? maxMatches
                    ? faq.matches === maxMatches? 1 : 0
                    : 0
                    : 1;

                if(subjects[faq.subject]){
                    if(!search.value || faq.matches === maxMatches) {
                        subjects[faq.subject].questions += toAdd;
                    }
                } else {
                    subjects[faq.subject] = {
                        name: faq.subject,
                        questions: toAdd
                    };
                }
                
                return subjects;
            }, {});
        
            const subjectOptions = sortByField(Object.values(subjects), 'name').map(subject => ({
                label: `${subject.name} (${subject.questions})`,
                value: subject.name,
                questionsAmmount: subject.questions,
                onClick: () => setSelectedSubject(subject.name)
            }));
    
            setSubjectOptions(subjectOptions);
        }
    }, [faqData]);

    useEffect(() => {
        const currentSubject = subjectOptions.find(option => option.value === selectedSubject);

        if(currentSubject && currentSubject.questionsAmmount === 0) {
            const subjectWithQuestions = subjectOptions.find(option => option.questionsAmmount > 0);

            if(subjectWithQuestions) {
                setSelectedSubject(subjectWithQuestions.value);
            }
        }
    }, [subjectOptions]);

    const fetchFaqData = async () => {
        const res = await fetcher.getFaq();

        if(res.ok) {
            const [data, maxMatches] = applySearch(res.data);
            setFaqData(data);
            setMaxMatches(maxMatches);

            if(selectedSubject !== 'Account Settings') {
                const faq = data.find(faq => faq.subject.toLowerCase() === selectedSubject.toLocaleLowerCase());
                setSelectedSubject((faq && faq.subject) || 'Account Settings');
            }
        }
    }

    const applySearch = (data) => {
        let maxMatches = 0;

        data.forEach(faq => {
            const words = wordsSplitter(search.value);
            const matches = words.filter(word => faq.keywords.includes(word.toLowerCase())).length;
            faq.matches = matches;
            maxMatches = Math.max(matches, maxMatches);
        });

        return [data, maxMatches];
    }

    const handleOnAskQuestion = () => {
        modalCtx.show(<AskQuestion subjects={subjectOptions.map(subject => subject.value)}/>);
    }

    const questions = faqData && 
        faqData.filter(faq => faq.subject === selectedSubject && (!search.value || (faq.matches && faq.matches === maxMatches)))
        .map(faq => <Question key={faq.question} {...faq}/>);

    return (
        <Page className={style.FAQ}>
            <Banner
                className={style.banner}
                titleClassName={style.bannerTitle}
                contentClassName={style.bannerContent}
                icon='faq'
                iconProps={{filled: true, weight: 400}}
                title='FAQ' 
                image={`/images/banners/faq.svg`} 
                style={{
                    backgroundPosition: '100% 0%',
                    backgroundSize: '75%'
                }}
                gradient='linear-gradient(to right, #070F21 25%, #080f21bf 75%)'
            >
                <div className={style.searchWrapper}>
                    <TextInput
                        className={style.search}
                        input={search}
                        placeholder='What are you looking for?'
                        confirmButton='search'
                        cleanButton
                    />
                    <Button
                        className={style.button}
                        type='text'
                        icon='support'
                        color='white'
                        onClick={handleOnAskQuestion}
                    >
                        Didn’t find what you are looking for? Click here to send us your question so we can add it to our FAQ.
                    </Button>
                </div>
            </Banner>
            <LoadableContent loading={!faqData}>
                <Page 
                    className={style.page}
                    leftContainer={{
                        className: style.subjects
                    }}
                    rightContainer={{
                        className: style.questions
                    }}
                    doubleContainer
                >
                    <TextNavbar 
                        className={style.subjects}
                        activeClassName={style.activeSubject}
                        items={subjectOptions}
                        selectedItem={selectedSubject}
                        disableRules
                    />
                    <>
                        <Header 
                            className={style.subjectName} 
                            text={selectedSubject} 
                            icon={selectedSubject.toLowerCase()}
                            color='theme'
                        />
                        {questions && questions.length
                            ? questions
                            : <NoDataFound text='No questions were found for this topic' />
                        }
                    </>
                </Page>
            </LoadableContent>
        </Page>
    );
}

export default FAQ;