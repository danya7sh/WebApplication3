class FileUploadWithComponents extends FileUpload {

    send() {

        this.createComponents();

        this.sendAndChanges();

    }

    sendAndChanges() {

        super.sendChunk()
            .then(
            fileName => {

                this.loaded += this.step;

                let charCodes = this.getCharCodes(fileName);

                this.changeProgress(charCodes);

                if (this.loaded < this.total) {
                    this.chunk = this.file.slice(this.loaded, this.loaded + this.step);
                    this.sendAndChanges();
                }
                else
                    this.changeComponents(fileName, charCodes);

            });

    }

    getCharCodes(fileName) {

        let charCodes = "";

        for (let i = 0; i < fileName.length; i++) {
            charCodes += fileName.charCodeAt(i);
        }

        return charCodes;

    }

    createComponents() {

        let charCodes = this.getCharCodes(this.fileName);

        if ($("#components" + charCodes).length)
            $("#components" + charCodes).remove();

        let components =

            '<div id="components' + charCodes + '" class="row justify-content-center">' +

            '' + '<div class="col-4">' +
            '' + '' + '<div class="progress" style="height: 38px;">' +
            '' + '' + '' + '<div id="progress' + charCodes + '" class="progress-bar" role="progressbar" ' +
            '' + '' + '' + 'aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>' +
            '' + '' + '</div>' +
            '' + '</div>' +

            '' + '<div class="col-1">' +
            '' + '' + '<button id="button' + charCodes + '" type="button" class="btn btn-light">Cancel</button>' +
            '' + '</div>' +

            '' + '<div class="col-4">' +
            '' + '' + '<div class="input-group mb-3">' +
            '' + '' + '' + '<div class="input-group-prepend">' +
            '' + '' + '' + '' + '<span class="input-group-text" id="basic-addon1">URL</span>' +
            '' + '' + '' + '</div>' +
            '' + '' + '' + '<input id="input' + charCodes + '" type="text" class="form-control" ' +
            '' + '' + '' + 'value="' + this.fileName + '" aria-label="URL" aria-describedby="basic-addon1"' +
            '' + '' + '</div>' +
            '' + '</div>' +

            '</div>';

        $("#customFileInput").after(components);

        $("#button" + charCodes).click((e) => this.abort(e));

    }

    abort(e) {

        if (this.xhr.readyState != 4) {
            this.xhr.abort();
        }

        $("#components" + $(e.target).attr("id").substring(6)).remove();

        $.ajax({
            method: 'POST',
            url: 'home/delete',
            data: { fileName: this.fileName }
        });

    }

    changeProgress(charCodes) {

        $("#progress" + charCodes).text(Math.round((this.loaded / this.total) * 100) + "%");
        $("#progress" + charCodes).attr("style", "width: " + (this.loaded / this.total) * 100 + "%;");

    }

    changeComponents(fileName, charCodes) {

        $("#progress" + charCodes).text(fileName);

        $("#button" + charCodes).text("Delete");

        $("#input" + charCodes).attr("value", "http://localhost:63115/home/download?fileName=" + fileName);
        $("#input" + charCodes).select();

    }

}