<script>
	// @ts-nocheck

	import * as R from 'remeda'; // tree-shaking supported!
	import { register } from 'swiper/element/bundle';
	import Icons from './Icons.svelte';
	import { items, switchFilter, filter } from '../stores/useHeader';
	register();
</script>

<div>
	<swiper-container slides-per-view={3.5} space-between={15} freeMode={true}>
		{#each items as item (item)}
			<swiper-slide class="grid place-items-center" on:click={() => switchFilter(item.id)}>
				<Icons
					variant={item.icon}
					class={`text-7 ${item.id === $filter?.id ? 'fill-base-content' : 'fill-base-300'}`}
					weight={item.id === $filter?.id ? 'fill' : 'duotone'}
				/>
				<div
					class={`font-semibold -mb-[4px] ${
						item.id === $filter?.id ? 'text-base-content' : 'text-base-300'
					}`}
				>
					{item.title}
				</div>
				<div class={`text-3 font-semibold text-base-300`}>{item.subtitle}</div>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>
