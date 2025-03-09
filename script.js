let imageFiles = [];

document.getElementById("imageUpload").addEventListener("change", function(event) {
    const files = event.target.files;
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.draggable = true;
            img.ondragstart = dragStart;
            document.getElementById("collage").appendChild(img);
            imageFiles.push(e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.src);
}

document.getElementById("collage").addEventListener("dragover", function(event) {
    event.preventDefault();
});

document.getElementById("collage").addEventListener("drop", function(event) {
    event.preventDefault();
    const src = event.dataTransfer.getData("text/plain");
    const draggedImage = document.querySelector(`img[src="${src}"]`);
    this.appendChild(draggedImage);
});

function downloadCollage() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let columns = Math.ceil(Math.sqrt(imageFiles.length));
    let rows = Math.ceil(imageFiles.length / columns);
    let imgSize = 200;

    canvas.width = columns * imgSize;
    canvas.height = rows * imgSize;

    let index = 0;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            if (index < imageFiles.length) {
                const img = new Image();
                img.src = imageFiles[index];
                img.onload = function() {
                    ctx.drawImage(img, x * imgSize, y * imgSize, imgSize, imgSize);

                    if (index === imageFiles.length - 1) {
                        let link = document.createElement("a");
                        link.href = canvas.toDataURL("image/png");
                        link.download = "collage.png";
                        link.click();
                    }
                };
            }
            index++;
        }
    }
}
