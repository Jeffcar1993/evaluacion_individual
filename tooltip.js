const boton = document.querySelector('#boton_tol');
const tooltip = document.querySelector('#tooltip_1');

const calcularPosicionTooltip = () => {
    const x = boton_tol.offsetLeft;
    const y = boton_tol.offsetTop;
    
    const anchoTooltip = tooltip_1.clientWidth;
    const altoTooltip = tooltip_1.clientHeight;
    
    const izquierda = x + 20;
    const arriba = y - altoTooltip - 10;
    
    tooltip_1.style.left = `${izquierda}px`; 
    tooltip_1.style.top = `${arriba}px`;
};

window.addEventListener ('load', () => {
    calcularPosicionTooltip();
});

window.addEventListener ('resize', () => {
    calcularPosicionTooltip();
});


boton_tol.addEventListener('mouseenter', () => {
    setTimeout (() => {
        tooltip_1.classList.add('activo');
    calcularPosicionTooltip();
    }, 300);
});

boton_tol.addEventListener('mouseleave', () => {
    tooltip_1.classList.remove('activo');
    calcularPosicionTooltip();
});
