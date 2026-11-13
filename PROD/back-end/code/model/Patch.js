const Model = require("./Model");

class Patch extends Model {
    static collection = 'patchs';
    static ModelClass = Patch;

    constructor(data) {
        super(Patch, data);

    }

    setDocument(data) {
        const document = {};

        document.version = data.version;
        document.date = data.date;
        document.notes = data.notes;

        this.document = document;
    }

    validation() {
        if (
            !!this.document.version &&
            !!this.document.date &&
            !!this.document.notes
        ) {
            return {ok: true};
        } else {
            return {ok: false};
        }
    }
}

module.exports = Patch;