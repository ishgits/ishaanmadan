const root = document.querySelector('.experience-venus');
if (root) {

    const title=root.querySelector('#env-title'),copy=root.querySelector('#env-copy');
    const environments={water:{title:'Water-rich conditions',copy:'Forming larger molecules by removing water is often thermodynamically difficult in ordinary aqueous settings.'},dry:{title:'Lower-water conditions',copy:'Lower water availability changes the energetic balance. Some dehydration chemistry can become less strongly opposed.'},acid:{title:'Sulfuric-acid conditions',copy:'Very low water activity and strong acidity create a chemically unfamiliar setting worth testing. The paper models one version of this setting.'}};
    root.querySelectorAll('[data-environment]').forEach(button=>button.addEventListener('click',()=>{root.querySelectorAll('[data-environment]').forEach(b=>b.setAttribute('aria-pressed','false'));button.setAttribute('aria-pressed','true');const setting=environments[button.dataset.environment];title.textContent=setting.title;copy.textContent=setting.copy;}));
    root.querySelectorAll('.evidence button').forEach(button=>button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')==='true';root.querySelectorAll('.evidence button').forEach(b=>b.setAttribute('aria-expanded','false'));button.setAttribute('aria-expanded',String(!open));}));
  
  root.querySelectorAll('.evidence button').forEach(button => button.removeAttribute('disabled'));
  root.classList.add('controls-ready');
}
