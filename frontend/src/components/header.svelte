<script>
	import { onMount } from 'svelte';
	import HeaderBranding from './HeaderBranding.svelte';
	import MobileHeaderControllers from './MobileHeaderController.svelte';
	import FilterTab from './FilterTab.svelte';
	import Search from './Search.svelte';
	import HeaderController from './HeaderController.svelte';
	onMount(() => {
		// @ts-ignore
		// document.querySelector('html').setAttribute('data-theme', 'dark');
	});
</script>

<div class="header border-b border-base-200 bg-base-100">
	<div class="ipad:hidden">
		<div class="h-14 grid grid-flow-col items-center grid-cols-[auto_max-content] px-4">
			<HeaderBranding />
			<MobileHeaderControllers />
		</div>
		<FilterTab />
	</div>

	<div class="hidden ipad:block">
		<div class="header border-b border-base-200 py-1">
			<div class="h-14 grid grid-flow-col items-center grid-cols-[max-content_1fr] gap-10 px-4">
				<HeaderBranding />
				<Search />
				<HeaderController />
			</div>
			<FilterTab />
		</div>
	</div>
</div>
