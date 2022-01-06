/**
 * Created by Asef on 8/1/2017.
 */



const validateMessages = {
    required: () => {
        return 'This field is required'
    },

    arrayMinLength: (min) => {
        return 'Xananın doldurulması vacibdir'
    },

    minLength: (min, field) => {
        return `${field || 'value'} must contain min. ${ min } characters`
    },

    maxLength: (max) => {
        return `Xananın uzunluğu ən çox ${ max } olmalıdır`
    },

    length: (length) => {
        `Xananın uzunluğu ən çox ${ length } olmalıdır`
    },

    requiredIfNot: (length) => {
        return 'Xananın doldurulması vacibdir'
    },
    min: (min) => {
        return `Xananya en az ${ min } yazıla bilər`
    },
    max: (max) => {
        return `Xananya en çox ${ max } yazıla bilər`
    },
    email(){
        return "Hmm...that doesn't look like an email address."
    }
};


export default class Validation {

    constructor(rules, data, messages) {
        this.rules = rules;
        this.messages = messages || {};
        this.validity = {};


        for (let field in rules) {
            this.validity[field] = {
                value: data[field],
                valid: true,
                invalid: false,
                messages: []
            };
        }

        this.validateFuncs = {

            required: (value) => {
                return value && value.toString().trim().length
            },

            arrayMinLength: (value, min) => {
                // console.log(value, min);
                return value.length >= min;
            },

            minLength: (value, min) => {
                if(!value) return true;
                return value.trim().length >= min
            },

            maxLength: (value, max) => {
                if(!value) return true;
                return value.trim().length <= max
            },

            min: (value, min) => {
                if (!value) return true;
                return value >= min
            },

            max: (value, max) => {
                if (!value) return true;
                return value <= max
            },

            length: (value, length) => {
                return value.trim().length === parseInt(length)
            },

            requiredIfNot: (...args) => {
                let valid = false;
                args.map((field, key) => {
                    if (key !== 0) {
                        // console.log(this.validity, field);
                        if (this.validateFuncs.required(this.validity[field].value)) {
                            valid = true
                        }
                    }
                });
                if (valid) return valid;
                return this.validateFuncs.required(args[0])
            },
            email(email){
                if(!email) return true;
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
        };


        for (let field in rules) {
            this.validate(field, data[field])
        }


    }


    validate(field, value) {

        const validity = {
            value: value,
            valid: true,
            invalid: false,
            messages: []
        };

        if (this.rules[field]) {
            let rules = this.rules[field].split('|');

            rules.map((rule) => {
                const methodAndParams = rule.split(':');
                const method = methodAndParams[0];

                if (this.validateFuncs.hasOwnProperty(method)) {
                    const params = methodAndParams[1] ? methodAndParams[1].split(',') : [];
                    params.unshift(value);
                    const methodValidationResult = this.validateFuncs[method].apply(this, params);

                    if (!methodValidationResult) {
                        validity.valid = false;
                        validity.invalid = true;

                        const msgParams = methodAndParams[1] ? methodAndParams[1].split(',') : [];
                        validity.messages.push(this.messages[field] && this.messages[field][method] ? this.messages[field][method](params) : validateMessages[method](msgParams))
                    }

                } else {
                    console.error(`validation method ${method} does not exists`)
                }
            });

            this.validity[field] = validity
        }

    };


    isValid() {
        let valid = true;
        for (let field in this.rules) {
            if (!this.validity[field].valid) {
                // console.log(field, this.validity[field])
                valid = false
            }
        }
        return valid
    }


    addField(data) {
        this.rules = Object.assign({}, this.rules, data);
        for (let field in data) {
            this.validate(field, '')
        }
    }


    removeField(data) {
        data.map(field => {
            delete this.rules[field]
        })
    }

    getMessages(field) {
        return this.validity[field] ? this.validity[field].messages : []
    }

    validateAll(data) {
        for (let field in this.rules) {
            this.validity[field] = {
                value: data[field],
                valid: true,
                invalid: false,
                messages: []
            };
        }

        for (let field in this.rules) {
            this.validate(field, data[field])
        }

    }
}
