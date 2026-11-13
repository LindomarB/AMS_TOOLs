const Model = require("./Model");

class SupportMessage extends Model {
    static collection = 'support';
    static ModelClass = SupportMessage;

    constructor(data) {
        super(SupportMessage, data);
    }

    _bugReportValidation() {
        return [
            'low',
            'medium',
            'high',
            'critical'
        ].includes(this.document.impact);
    }

    _talkToUsValidation() {
        return [
            'help',
            'suggestion',
            'new feature'
        ].includes(this.document.subject);
    }

    _newFaqValidation() {
        return !!this.document.subject;
    }

    setDocument(data) {
        const document = {...data};
        this.document = document;
    }

    validation() {
        if (
            !this.document.type ||
            !this.document.message ||
            !this.document.meta
        ) {
            return {ok: false};
        } else {
            switch(this.document.type) {
                case 'bug report':
                    return {ok: this._bugReportValidation()};
                case 'talk to us':
                    return {ok: this._talkToUsValidation()};
                case 'new faq':
                    return {ok: this._newFaqValidation()};
                default:
                    return {ok: false};
            }            
        }
    }
}

module.exports = SupportMessage;