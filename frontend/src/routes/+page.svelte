<script>
	import { Baby, CheckFat, EggCrack, MagnifyingGlass } from 'phosphor-svelte';
	import { filter } from '../stores/useHeader';
	import Icons from '../components/Icons.svelte';

	let questions = [
		{
			title: `As my little one begins to experience a wider range of emotions, what strategies or games could help them understand and express these feelings in a healthy, age-appropriate way?`,
			votes: 7,
			answers: 3,
			approved: true,
			views: 419,
			user: 'Antoni',
			userImage: 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
			timeAgo: '2 min ago'
		},
		{
			title: `It's natural for young children to be scared of the unknown or everyday things. What can I do, or stories can I tell, to reassure them and reduce their fears during these startling moments?`,
			votes: 0,
			answers: 1,
			approved: false,
			views: 182,
			user: 'Michel Floyd',
			userImage: 'https://i.pravatar.cc/150?img=3',
			timeAgo: '53 min ago'
		},
		{
			title: `It's not uncommon to feel frustrated when dealing with the challenges of this age. How can I effectively manage my own feelings, so it doesn't impact my child negatively during these teaching moments?`,
			votes: 0,
			answers: 0,
			views: 92,
			user: 'Michel Floyd',
			userImage: 'https://i.pravatar.cc/150?img=3',
			timeAgo: '53 min ago'
		}
	];
</script>

{#if $filter}
	<div class="flex justify-between items-center px-4 h-16">
		<div class="flex gap-2 items-center">
			<div>
				<Icons variant={$filter?.icon} class="fill-base-content text-8" weight="fill" />
			</div>
			<div class="">
				<div class="font-semibold text-4">{$filter?.title}</div>
				<div class="font-semibold text-5 -mt-2 -mb-[3px]">Questions</div>
				<div class="font-semibold text-3 text-base-300">{$filter?.subtitle}</div>
			</div>
		</div>
		<button class="btn btn-primary">Ask Question</button>
	</div>
{:else}
	<div class="flex justify-between items-center px-4 h-16">
		<div class="font-semibold text-5">Top Questions</div>
		<button class="btn btn-primary">Ask Question</button>
	</div>
{/if}

<div
	role="tablist"
	class="mt-6 rounded-none justify-center border-t border-base-200 flex gap-4 h-12 items-center"
>
	<button class="btn btn-primary btn-sm normal-case">Top</button>
	<button class="text-base-300 font-bold">Week</button>
	<button class="text-base-300 font-bold">Month</button>
</div>

<div class="border-b border-base-300 bg-base-200">
	{#each questions as { title, votes, answers, views, userImage, user, timeAgo, approved }}
		<div class="border-t border-base-300 p-4">
			<div class="flex items-center gap-2 font-medium text-base-300">
				{#if approved}
					<CheckFat class="fill-success text-4" weight="fill" />
				{/if}
				<div
					class={`${
						approved
							? 'text-success font-semibold'
							: answers > 0
							? 'text-base-content font-semibold'
							: 'text-base-300'
					} `}
				>
					{answers}
					{answers !== 1 ? 'answers' : 'answer'}
				</div>
				<div class="w-1 h-1 bg-base-300 rounded-full" />
				<div>{votes} votes</div>
				<div class="w-1 h-1 bg-base-300 rounded-full" />
				<div>{views} views</div>
			</div>
			<div class="my-2 font-medium">{title}</div>
			<div class="text-right flex justify-end items-center">
				<div class="avatar">
					<div class="w-5 h-5 rounded border-2 border-base-content mr-[6px]">
						<img src={userImage} alt="avatar" />
					</div>
				</div>
				<div class="flex gap-1 font-medium">
					<div class="text-accent">{user}</div>
					<div class="text-base-300">answered {timeAgo}</div>
				</div>
			</div>
		</div>
	{/each}
	<!-- <div class="border-t border-base-300 p-4">
		<div>0 votes 0 answers 416 views</div>
		<div>
			Self-image issues can emerge early. How do I foster a healthy body image and self-acceptance
			in my child amid societal pressures and media influences?
		</div>
		<div>Antoni answered 1 min ago</div>
	</div> -->
</div>
