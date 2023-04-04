<script lang="ts">
	import {createEventDispatcher, onMount} from 'svelte'
	let dispatch = createEventDispatcher();
	import calendarize from './calendarize'
	import Arrow from './CalendarArrow.svelte';	
	export let year = 2023;
	export let month = 0; // Jan
	export let offset = 0; // Sun
	export let locale = "en" as (keyof typeof text_labels)|(keyof typeof text_months);
	export let buddhist = false
	const text_labels = {
		en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
		th: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
	}
	const text_months = {
		en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		th: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
	}
	const today = new Date
	const labels = (locale in text_labels)? text_labels[locale]:text_labels.en
	const months = (locale in text_months)? text_months[locale]:text_months.en
	$: today_month = today.getMonth();
	$: today_year = today.getFullYear();
	$: today_day = today.getDate();
	
	let prev = calendarize(new Date(year, month-1), offset);
	let current = calendarize(new Date(year, month), offset);
	let next = calendarize(new Date(year, month+1), offset);
	
	function toPrev() {
		[current, next] = [prev, current];
		
		if (--month < 0) {
			month = 11;
			year--;
		}
		
		prev = calendarize(new Date(year, month-1), offset);
	}
	
	function toNext() {
		[prev, current] = [current, next];
		
		if (++month > 11) {
			month = 0;
			year++;
		}
		next = calendarize(new Date(year, month+1), offset);
	}
	
	function isToday(day:number ) {
		return today && today_year === year && today_month === month && today_day === day;
	}
</script>

<header>
	<Arrow left on:click={toPrev} />
	<h4>{months[month]} - {year+ (buddhist?543:0)}</h4>
	<Arrow on:click={toNext} />
</header>

<div class="month">
	{#each labels as txt, idx (txt)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<span class="label" on:click={()=>dispatch('headerClick',txt)} >{ labels[(idx + offset) % 7] }</span>
	{/each}

	{#each { length:6 } as w,idxw (idxw)}
		{#if current[idxw]}
			{#each { length:7 } as d,idxd (idxd)}
				{#if current[idxw][idxd] != 0}
					<span class="date" class:today={isToday(current[idxw][idxd])}>
						{ current[idxw][idxd] }
					</span>
				{:else if (idxw < 1)}
					<span class="date other">{ prev[prev.length - 1][idxd] }</span>
				{:else}
					<span class="date other">{ next[0][idxd] }</span>
				{/if}
			{/each}
		{/if}
	{/each}
</div>

<style>
	header {
		display: flex;
		margin: 2rem auto;
		align-items: center;
		justify-content: center;
		user-select: none;
	}
	
	h4 {
		display: block;
		text-align: center;
		text-transform: uppercase;
		font-size: 140%;
		margin: 0 1rem;
	}
	.month {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: right;
		grid-gap: 4px;
	}
	.label {
		font-weight: 300;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.6;
	}
	.date {
		height: 50px;
		font-size: 16px;
		letter-spacing: -1px;
		border: 1px solid #e6e4e4;
		padding-right: 4px;
		font-weight: 700;
		padding: 0.5rem;
	}
	.date.today {
		color: #5286fa;
		background: #c4d9fd;
		border-color: currentColor;
	}
	.date.other {
		opacity: 0.2;
	}
</style>