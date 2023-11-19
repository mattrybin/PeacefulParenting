<script lang="ts">
	export let variant: string = '';
	let cn: string | undefined = undefined;
	export { cn as class };
	export let weight: 'duotone' | 'fill' = 'duotone';
</script>

{#if variant === 'EggCrack'}
	{#await import('phosphor-svelte/lib/EggCrack') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}

{#if variant === 'Baby'}
	{#await import('phosphor-svelte/lib/Baby') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}

{#if variant === 'Tooth'}
	{#await import('phosphor-svelte/lib/Tooth') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}

{#if variant === 'Backpack'}
	{#await import('phosphor-svelte/lib/Backpack') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}

{#if variant === 'PersonSimpleThrow'}
	{#await import('phosphor-svelte/lib/PersonSimpleThrow') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}

{#if variant === 'GraduationCap'}
	{#await import('phosphor-svelte/lib/GraduationCap') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}

{#if variant === 'HouseLine'}
	{#await import('phosphor-svelte/lib/HouseLine') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}

{#if variant === 'UsersThree'}
	{#await import('phosphor-svelte/lib/UsersThree') then Icon}
		<Icon.default class={cn} {weight} />
	{/await}
{/if}
