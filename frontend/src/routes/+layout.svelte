<script>
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/header.svelte';
</script>

<div class="root-container">
	<div class="content-container">
		<Header />
		<slot />
	</div>
	<Footer />
</div>
