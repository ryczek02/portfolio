<script lang="ts">
	let canvasEl: HTMLCanvasElement | undefined = $state();
	let mouseX = $state(0.5);
	let mouseY = $state(0.5);

	interface Particle {
		x: number; y: number;
		vx: number; vy: number;
		baseX: number; baseY: number;
		size: number;
	}

	const PARTICLE_COUNT = 80;
	const CONNECTION_DIST = 120;
	const MOUSE_RADIUS = 150;
	let particles: Particle[] = [];
	let animFrame: number;
	let w = 0, h = 0;

	function init() {
		if (!canvasEl) return;
		w = canvasEl.width = canvasEl.offsetWidth * 2;
		h = canvasEl.height = canvasEl.offsetHeight * 2;

		particles = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const x = Math.random() * w;
			const y = Math.random() * h;
			particles.push({
				x, y, baseX: x, baseY: y,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
				size: 1 + Math.random() * 1.5,
			});
		}
	}

	function getThemeColors() {
		const styles = getComputedStyle(document.documentElement);
		const particle = styles.getPropertyValue('--particle-color').trim() || '255,255,255';
		const accent = styles.getPropertyValue('--particle-accent').trim() || '0,255,136';
		return { particle, accent };
	}

	function animate() {
		if (!canvasEl) return;
		const ctx = canvasEl.getContext('2d')!;
		ctx.clearRect(0, 0, w, h);

		const { particle: pCol, accent: aCol } = getThemeColors();

		const mx = mouseX * w;
		const my = mouseY * h;

		for (const p of particles) {
			p.x += p.vx;
			p.y += p.vy;

			if (p.x < 0 || p.x > w) p.vx *= -1;
			if (p.y < 0 || p.y > h) p.vy *= -1;

			const dx = p.x - mx;
			const dy = p.y - my;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < MOUSE_RADIUS && dist > 0) {
				const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.8;
				p.x += (dx / dist) * force;
				p.y += (dy / dist) * force;
			}

			const alpha = 0.15 + Math.min(0.4, (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.5);
			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(${pCol},${Math.max(0.15, alpha)})`;
			ctx.fill();
		}

		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const dx = particles[i].x - particles[j].x;
				const dy = particles[i].y - particles[j].y;
				const dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < CONNECTION_DIST) {
					const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
					ctx.beginPath();
					ctx.moveTo(particles[i].x, particles[i].y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.strokeStyle = `rgba(${pCol},${alpha})`;
					ctx.lineWidth = 0.5;
					ctx.stroke();
				}
			}
		}

		for (const p of particles) {
			const dx = p.x - mx;
			const dy = p.y - my;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < MOUSE_RADIUS) {
				const alpha = (1 - dist / MOUSE_RADIUS) * 0.2;
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(mx, my);
				ctx.strokeStyle = `rgba(${aCol},${alpha})`;
				ctx.lineWidth = 0.5;
				ctx.stroke();
			}
		}

		animFrame = requestAnimationFrame(animate);
	}

	function handleMouse(e: MouseEvent) {
		if (!canvasEl) return;
		const rect = canvasEl.getBoundingClientRect();
		mouseX = (e.clientX - rect.left) / rect.width;
		mouseY = (e.clientY - rect.top) / rect.height;
	}

	$effect(() => {
		if (!canvasEl) return;
		init();
		animate();

		const resizeObs = new ResizeObserver(() => init());
		resizeObs.observe(canvasEl);

		return () => {
			if (animFrame) cancelAnimationFrame(animFrame);
			resizeObs.disconnect();
		};
	});
</script>

<canvas
	bind:this={canvasEl}
	class="particles"
	onmousemove={handleMouse}
></canvas>

<style>
	.particles {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: all;
		z-index: 0;
	}
</style>
