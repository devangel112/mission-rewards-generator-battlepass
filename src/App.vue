<template>
	<div id="app">
		<nav>
			<router-link to="/">Misiones</router-link>
			<router-link to="/rewards">Recompensas</router-link>
		</nav>
		<div class="view">
			<router-view />
		</div>
	</div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #000;
	min-height: 100vh;
	height: auto;
	max-width: 100%;
	width: 100vw;
	background: #2c3e50;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #fff;
		margin-right: 5px;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}

.view {
	width: 90%;
	margin: auto;
}
</style>
