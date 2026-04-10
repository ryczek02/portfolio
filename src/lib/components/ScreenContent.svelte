<script lang="ts">
	// Komponent renderowany na ekranie ESP32
	// Rozmiar ekranu: 368x448px
</script>

<div class="screen">
	<div class="screen-header">
		<span class="dot green"></span>
		<span class="label">BikeESP v1.2</span>
	</div>
	<div class="screen-body">
		<div class="stat">
			<span class="stat-value">32.4</span>
			<span class="stat-unit">km/h</span>
		</div>
		<div class="stat-row">
			<div class="stat-small">
				<span class="stat-label">DIST</span>
				<span class="stat-val">47.2 km</span>
			</div>
			<div class="stat-small">
				<span class="stat-label">CADENCE</span>
				<span class="stat-val">87 rpm</span>
			</div>
		</div>
		<div class="stat-row">
			<div class="stat-small">
				<span class="stat-label">HEART</span>
				<span class="stat-val">156 bpm</span>
			</div>
			<div class="stat-small">
				<span class="stat-label">POWER</span>
				<span class="stat-val">245 W</span>
			</div>
		</div>
		<div class="graph">
			<svg viewBox="0 0 300 60" fill="none">
				<polyline
					points="0,50 30,45 60,30 90,35 120,20 150,25 180,15 210,22 240,10 270,18 300,5"
					stroke="#00ff88"
					stroke-width="2"
					fill="none"
				/>
				<polyline
					points="0,50 30,45 60,30 90,35 120,20 150,25 180,15 210,22 240,10 270,18 300,5"
					stroke="none"
					fill="url(#grad)"
				/>
				<defs>
					<linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stop-color="#00ff88" stop-opacity="0.3" />
						<stop offset="100%" stop-color="#00ff88" stop-opacity="0" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	</div>
</div>

<style>
	.screen {
		width: 368px;
		height: 448px;
		background: #000000;
		color: #ffffff;
		font-family: 'Space Mono', monospace;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 24px;
		position: relative;
		/* Blend z modelem 3D pod spodem - czarny staje się przezroczysty,
		   jasne piksele (tekst, dane) zostają widoczne,
		   połysk z modelu prześwituje przez ciemne obszary */
		mix-blend-mode: screen;
	}

	.screen-header {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 16px 20px;
		border-bottom: 1px solid #1a1a1a;
		border-radius: 24px 24px 0 0;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}

	.dot.green {
		background: #00ff88;
		box-shadow: 0 0 6px #00ff88;
	}

	.label {
		font-size: 11px;
		letter-spacing: 0.1em;
		color: #666;
		text-transform: uppercase;
	}

	.screen-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 20px;
		gap: 16px;
	}

	.stat {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.stat-value {
		font-size: 64px;
		font-weight: 700;
		font-family: 'Inter', sans-serif;
		letter-spacing: -0.03em;
		line-height: 1;
		color: #ffffff;
	}

	.stat-unit {
		font-size: 16px;
		color: #666;
		letter-spacing: 0.05em;
	}

	.stat-row {
		display: flex;
		gap: 20px;
	}

	.stat-small {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 10px 12px;
		border: 1px solid #1a1a1a;
	}

	.stat-label {
		font-size: 9px;
		letter-spacing: 0.15em;
		color: #555;
	}

	.stat-val {
		font-size: 15px;
		font-weight: 700;
		font-family: 'Inter', sans-serif;
		color: #00ff88;
	}

	.graph {
		margin-top: auto;
		padding-top: 8px;
		border-top: 1px solid #1a1a1a;
	}

	.graph svg {
		width: 100%;
		height: 60px;
	}
</style>
