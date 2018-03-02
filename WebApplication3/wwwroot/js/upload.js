class Upload {

    constructor(files, url) {

        this.files = files;
        this.url = url;

    }

    send() {

        for (let i = 0; i < this.files.length; i++) {

            new FileUpload(this.files[i], this.url).send();

        }

    }

    sendWithComponents() {

        for (let i = 0; i < this.files.length; i++) {

            new FileUploadWithComponents(this.files[i], this.url).send();

        }

    }

}