<script>
	import { onMount } from 'svelte';
	import { BookBookmark, SealQuestion, UserCircle, WechatLogo } from 'phosphor-svelte';

	let itemId = 0;
	let array = [
		{
			id: 0,
			icon: SealQuestion,
			title: 'Questions'
		},
		{
			id: 2,
			icon: WechatLogo,
			title: 'Chat AI'
		},
		{
			id: 1,
			icon: BookBookmark,
			title: 'Resources'
		},
		{
			id: 3,
			icon: UserCircle,
			title: 'Log in'
		}
	];
</script>

<div
	class="footer grid grid-flow-col justify-center items-center border-t border-base-200 bg-base-100"
>
	{#each array as element (element)}
		<button class="grid place-items-center gap-0" on:click={() => (itemId = element.id)}>
			<svelte:component
				this={element.icon}
				class={`text-7 ${element.id === itemId ? 'fill-base-content' : 'fill-base-300'}`}
				weight={element.id === itemId ? 'fill' : 'duotone'}
			/>
			<div
				class={`font-semibold text-3 ${
					element.id === itemId ? 'text-base-content' : 'text-base-300'
				}`}
			>
				{element.title}
			</div>
		</button>
	{/each}
</div>
