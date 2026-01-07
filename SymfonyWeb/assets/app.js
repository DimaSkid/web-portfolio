import './stimulus_bootstrap.js';
import './styles/app.css';

console.log('assets/app.js initialisé — carousel & animations prêts');

	document.addEventListener('DOMContentLoaded', function(){
	// Compétences : faire apparaître les cartes
	const section = document.querySelector('.competences');
	if(section){
		const cartes = section.querySelectorAll('.carte-competence');
		const obs = new IntersectionObserver((ents, o)=>{
			ents.forEach(e=>{
				if(e.isIntersecting){
					cartes.forEach((c,i)=> setTimeout(()=> c.classList.add('visible'), i*120));
					o.disconnect();
				}
			});
		}, {threshold:0.25});
		obs.observe(section);
	}
	const carousels = document.querySelectorAll('.carousel');
	carousels.forEach(car => {
		const slidesWrap = car.querySelector('.slides');
		const slides = Array.from(car.querySelectorAll('.slide'));
		if(!slides.length) return;
		let index = 0;
		const getWidth = ()=> car.clientWidth;
		const show = i => {
			const w = getWidth();
			slidesWrap.style.transform = `translateX(${ -i * w }px)`;
			slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
		};
		window.addEventListener('resize', ()=> show(index));

		const prev = car.querySelector('.carousel-control.prev');
		const next = car.querySelector('.carousel-control.next');
		if(prev) prev.addEventListener('click', ()=>{ index = (index-1+slides.length)%slides.length; show(index); resetAuto(); });
		if(next) next.addEventListener('click', ()=>{ index = (index+1)%slides.length; show(index); resetAuto(); });

		let timer = null;
		const startAuto = ()=>{ if(timer) clearInterval(timer); timer = setInterval(()=>{ index = (index+1)%slides.length; show(index); }, 3500); };
		const resetAuto = ()=>{ clearInterval(timer); startAuto(); };

		show(0);
		startAuto();

		car.addEventListener('mouseenter', ()=>{ clearInterval(timer); });
		car.addEventListener('mouseleave', ()=>{ startAuto(); });
	});

	// --- Mode jour/nuit ---
	const themeBtn = document.getElementById('toggle-theme');
	if (themeBtn) {
	    // Appliquer le thème sauvegardé au chargement
	    if (localStorage.getItem('theme') === 'night') {
	        document.body.classList.add('night-mode');
	        themeBtn.textContent = '☀️ Mode Jour';
	    }
	    themeBtn.addEventListener('click', function() {
	        const isNight = document.body.classList.toggle('night-mode');
	        if (isNight) {
	            localStorage.setItem('theme', 'night');
	            themeBtn.textContent = '☀️ Mode Jour';
	        } else {
	            localStorage.setItem('theme', 'day');
	            themeBtn.textContent = '🌙 Mode Nuit';
	        }
	    });
	}

});
