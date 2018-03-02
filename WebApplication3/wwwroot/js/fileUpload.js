class FileUpload {

    constructor(file, url) {

        this.file = file;
        this.url = url;
        this.fileName = file.name;
        this.total = file.size;
        this.step = 1024 * 1024 * 28;
        this.chunk = file.slice(0, this.step);
        this.loaded = 0;
        this.xhr;

    }

    send() {

        this.sendChunk()
            .then(
            fileName => {

                this.loaded += this.step;

                if (this.loaded < this.total) {
                    this.chunk = this.file.slice(this.loaded, this.loaded + this.step);
                    this.send();
                }

            });

    }

    sendChunk() {

        return new Promise((resolve, reject) => {

            let formData = new FormData();
            formData.append("File", this.chunk, this.fileName);

            this.xhr = new XMLHttpRequest();
            this.xhr.open("POST", this.url, true);

            this.xhr.onload = () => {
                if (this.xhr.status == 200)
                    resolve(JSON.parse(this.xhr.response).file.fileName);
            };

            this.xhr.send(formData);

        });

    }

}