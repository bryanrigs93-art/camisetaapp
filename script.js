const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');
const downloadBtn = document.getElementById('download-btn');
const captureArea = document.getElementById('capture-area');

// Subir imagen del usuario
imageUpload.addEventListener('change', function () {
  const file = this.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Hacer imagen arrastrable y redimensionable
interact('#uploaded-image')
  .draggable({
    onmove: event => {
      const target = event.target;
      const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  })
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    preserveAspectRatio: true
  })
  .on('resizemove', event => {
    const target = event.target;
    let x = parseFloat(target.getAttribute('data-x')) || 0;
    let y = parseFloat(target.getAttribute('data-y')) || 0;

    Object.assign(target.style, {
      width: `${event.rect.width}px`,
      height: `${event.rect.height}px`
    });

    x += event.deltaRect.left;
    y += event.deltaRect.top;

    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  });

// Descargar la camiseta con el diseño
downloadBtn.addEventListener("click", function () {
  html2canvas(captureArea, {
    backgroundColor: null
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "mi-diseño.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});
