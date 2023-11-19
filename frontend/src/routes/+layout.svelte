<script>
	import '../app.postcss';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/header.svelte';
</script>

<div class="root-container">
	<div class="content-container">
		<Header />
		<div class="py-4 pb-20">
			<slot />
		</div>
	</div>
	<Footer />
</div>
