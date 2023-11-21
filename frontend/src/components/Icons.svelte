<script lang="ts">
	import '@phosphor-icons/web/fill';
	import '@phosphor-icons/web/duotone';
	export let variant: string = '';
	let cn: string | undefined = undefined;
	export { cn as class };
	export let weight: 'duotone' | 'fill' = 'duotone';
</script>

<i class={`ph-${weight} ph-${variant.toLowerCase()} ${cn}`} />
