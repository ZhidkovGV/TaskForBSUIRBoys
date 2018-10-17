(() => {
    const inputElements = document.getElementsByTagName("INPUT");
    let isCreating = true;
    let dragable = false;
    const elements = [];
    const W_KEY_CODES = [87, 119,1094,1062];
    const tagClickListenteners = {
        BODY: addRectangle,
        DIV: dragRectangle,
        BUTTON: buttonClick
     };
     const bodyClick = document.body.addEventListener('click', (event) => {
        tagClickListenteners[event.target.tagName] && tagClickListenteners[event.target.tagName](event)
    });
    const fadeAway = document.body.addEventListener('keypress', (event) => {
       if (W_KEY_CODES.indexOf(event.keyCode) > -1) {
           for (const element of elements) {
               element.classList +=  'animated fadeOut';
               setTimeout(() => {
                   element.remove()
               },3000)
           }
       }
    });
    const startDrag = document.body.addEventListener('mousedown', (event) => {
       if (event.target.tagName === "DIV") {
           dragable = event.target;
           if (event.shiftKey) {
               event.target.style.zIndex = "100";
           }
       }
    });
    const drag = document.body.addEventListener('mousemove',(event) => {
       if (dragable) {
           dragable.style.top = event.clientY + "px";
           dragable.style.left = event.clientX + "px";
       }
    });
    const finishDrag = document.body.addEventListener('mouseup', (event) => {
       if (dragable) {
           dragable.style.zIndex = 0;
           dragable = false;
           console.log('1')
       }
    });
    function addRectangle() {
        if(isCreating) {
            const inputs = getInputsObject();
            const newRectangle = document.createElement('div');
            applyStyles(newRectangle, inputs);
            document.body.appendChild(newRectangle);
            elements.push(newRectangle);
        }
    }
    function getInputsObject() {
        return {
            height: inputElements[0].value || null,
            width: inputElements[1].value || null
        };
    }
    function applyStyles(newRectangle, inputs) {
        newRectangle.style.background = getRandomColor();
        newRectangle.style.width = inputs.width + 'px';
        newRectangle.style.position = 'absolute';
        newRectangle.style.height = inputs.height + 'px';
        newRectangle.style.top = event.clientY + 'px';
        newRectangle.style.left = event.clientX + 'px';
    }
    function buttonClick () {
        isCreating = !isCreating;
        isCreating ? event.target.innerHTML = "Хватит уже" : event.target.innerHTML = "Давай еще";
    }
    function dragRectangle() {
     }
     function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
 })();
