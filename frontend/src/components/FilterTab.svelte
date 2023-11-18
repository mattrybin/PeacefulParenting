<script lang="ts">
	import {
		Baby,
		Backpack,
		EggCrack,
		GraduationCap,
		HouseLine,
		PersonSimpleThrow,
		Tooth,
		UsersThree
	} from 'phosphor-svelte';
	import { register } from 'swiper/element/bundle';

	register();

	const spaceBetween = 10;
	const handleClick = (id: number) => {
		if (itemId !== id) {
			itemId = id;
		} else {
			itemId = undefined;
		}
	};
	import 'swiper/css';
	let itemId: number | undefined = undefined;

	let items = [
		{ id: 0, icon: EggCrack, title: 'Infancy', subtitle: '0-1 Years' },
		{ id: 1, icon: Baby, title: 'Toddler', subtitle: '1-3 Years' },
		{ id: 2, icon: Tooth, title: 'Child', subtitle: '3-8 Years' },
		{ id: 3, icon: Backpack, title: 'Preteen', subtitle: '9-12 Years' },
		{ id: 4, icon: PersonSimpleThrow, title: 'Teen', subtitle: '13-16 Years' },
		{ id: 5, icon: GraduationCap, title: 'Adult', subtitle: '17-21 Years' },
		{ id: 6, icon: HouseLine, title: 'Household', subtitle: 'Parents & kids' },
		{ id: 7, icon: UsersThree, title: 'Relatives', subtitle: 'Beyond home' }
	];
</script>

<div>
	<swiper-container slides-per-view={3.5} space-between={15} freeMode={true}>
		{#each items as item (item)}
			<swiper-slide class="grid place-items-center" on:click={() => handleClick(item.id)}>
				<svelte:component
					this={item.icon}
					class={`text-7 ${item.id === itemId ? 'fill-base-content' : 'fill-base-300'}`}
					weight={item.id === itemId ? 'fill' : 'duotone'}
				/>
				<div
					class={`font-semibold -mb-[4px] ${
						item.id === itemId ? 'text-base-content' : 'text-base-300'
					}`}
				>
					{item.title}
				</div>
				<div class={`text-3 font-semibold text-base-300`}>{item.subtitle}</div>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>
