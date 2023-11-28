<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { register } from 'swiper/element/bundle';
	import Icons from './Icons.svelte';
	import { items, switchFilter, filter } from '../stores/useHeader';
	register();
	onMount(() => {
		const swiperEl = document.querySelector('swiper-container');
		const swiperParams = {
			slidesPerView: 3.8,
			spaceBetween: 15,
			freeMode: true,
			breakpoints: {
				'360': {
					slidesPerView: 3.8,
					spaceBetween: 15
				},
				'390': {
					slidesPerView: 3.6,
					spaceBetween: 15
				},
				'430': {
					slidesPerView: 4.8,
					spaceBetween: 15
				}
			},
			on: {
				init() {
					// ...
				}
			}
		};

		// now we need to assign all parameters to Swiper element
		Object.assign(swiperEl, swiperParams);

		// and now initialize it
		swiperEl.initialize();
	});
	// register();
	// slides-per-view={3.8}
	// space-between={15}
	// freeMode={true}
	// breakpoints={{
	// 	'360': {
	// 		slidesPerView: 3.8,
	// 		spaceBetween: 15
	// 	},
	// 	'390': {
	// 		slidesPerView: 3.6,
	// 		spaceBetween: 15
	// 	},
	// 	'430': {
	// 		slidesPerView: 4.8,
	// 		spaceBetween: 15
	// 	}
	// }}
</script>

<div>
	<swiper-container init="false">
		{#each items as item (item)}
			<swiper-slide
				tabindex="0"
				role="button"
				on:keydown={() => switchFilter(item.id)}
				class="grid place-items-center"
				on:click={() => switchFilter(item.id)}
			>
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
