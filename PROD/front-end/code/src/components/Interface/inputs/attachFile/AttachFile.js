import React, { useEffect, useRef, useState } from 'react';
import Button from '../../buttons/button/Button';
import Icon from '../../icons/icon/Icon';
import Text from '../../Text/Text';
import style from './AttachFile.module.css';
import Loading from '../../loaders/loading/Loading';

function AttachFile(props) {
    const [files, setFiles] = useState([]);
    const [loadingPreviews, setLoadingPreviews] = useState([]);
    const [previews, setPreviews] = useState([]);
    const input = useRef();

    useEffect(() => {
        getPreviews();
        props.input.setValue(files)
    }, [files]);
    
    const getPreviews = async () => {
        setLoadingPreviews(true);

        const newPreviews = [];

        for(let file of files) {
            const preview = previews.find(preview => preview.name === file.name);

            if(preview) {
                newPreviews.push(preview);
                continue;
            };

            let image = null;
    
            if(file.type.split('/')[0] === 'image') {
                image = await readImageFile(file);
            }
    
            newPreviews.unshift({
                name: file.name,
                image
            });
        }

        setPreviews(newPreviews);     
        setLoadingPreviews(false);
    }

    const readImageFile = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = () => reject(fileReader.result);
            fileReader.readAsDataURL(file);
        });
    }

    const handleOnAddFile = () => {
        input.current.click();
    }

    const handleOnRemoveFile = (name) => {
        setFiles(curSt => curSt.filter(file => file.name !== name));
    }

    const onChange = (event) => {
        setFiles(curSt => {
            const newState = structuredClone(curSt);

            Array.from(event.target.files).forEach(newFile => {
                if(!newState.some(file => file.name === newFile.name)) {
                    newState.unshift(newFile);
                }
            });

            return newState;
        });

        props.onChange && props.onChange();
    }

    const previewsEl = previews.map(preview => (
        <div 
            key={preview.name} 
            className={`${style.file} ${style.preview}`}
            style={{
                backgroundImage: preview.image? `url(${preview.image})` : ''
            }}
        >
            <Button 
                className={style.removeButton}
                color='red'
                icon='close'
                tooltip='Remove file'
                highlight
                onClick={() => handleOnRemoveFile(preview.name)}
            />
            {!preview.image &&
                <Icon className={style.fileIcon} name='description' color='blue' size={48}/>
            }
            <Text className={style.fileName} color='white' size={12} ellipsis>
                {preview.name}
            </Text>
        </div>
    ));

    return (
        <div className={props.className || ''}>
            <label className={style.label}>
                {props.label} (formats: {props.accept}{props.maxSize? ` | max size: ${props.maxSize}` : ''})
            </label>
            <input 
                ref={input}
                className={style.input}
                type='file' 
                accept={props.accept}
                multiple={props.multiple}
                onChange={onChange}
                formEncType='multipart/form-data'
            />
            <div className={style.filesContainer}>
                <Button
                    className={style.file}
                    color='blue'
                    icon='attach_file_add'
                    onClick={handleOnAddFile}
                >
                    Add file
                </Button>
                {loadingPreviews
                    ? <Loading />
                    : previewsEl
                }
            </div>
        </div>
    );
}

export default AttachFile;