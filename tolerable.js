/**
 * Returns a promise that resolves after the element targeted by the selector appears in the DOM.
 *
 * @returns {Promise<HTMLElement>}
 */
function loader(selector) {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(_ => {
			if (document.querySelector(selector)) {
				observer.disconnect();
				return resolve(document.querySelector(selector));
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}

loader("div#app-mount").then((_) => {
	console.log("[tolerable] found app element, adding custom css");
	const stylesheet = document.createElement("style");
	stylesheet.innerText = `

	/* Hide Nitro and Shop buttons from the sidebar */
	li[role^="listitem"]:has(div > a[href*="/store"]),
	li[role^="listitem"]:has(div > a[href*="/shop"]) {
		display: none;
	}

	/* Hide animated avatar decorations */
	img[class*="avatarDecoration"], svg[class*="avatarDecoration"] {
		display: none;
	}

	/* Hide animated profile effects */
	div[class*="profileEffects"] {
		display: none !important;
	}

	/* Remove awful title bar */
	div.bar_c38106 {
		display: none;
	}

	/* Shift page up */
	div.content_c48ade {
		grid-row: noticeEnd !important;
	}

	/* Remove corner edge */
	.visual-refresh .sidebarListRounded_c48ade {
		border-radius: 0;
	}

	/* Pad top of server icon list */
	.visual-refresh .scroller_ef3116 {
		padding-top: 12px;
	}

	/* Increase server list height */
	.visual-refresh .wrapper_ef3116 {
		margin-bottom: var(--custom-app-panels-height)
	}

	/* Remove top border */
	.visual-refresh .sidebarList_c48ade,
	.visual-refresh .chat_f75fb0[data-has-border="true"],
	.visual-refresh .container__133bf {
		border-top: none;
	}

	/* Fix profile roundness when hovering */
	.visual-refresh .avatarWrapper__37e49 {
		border-top-left-radius: var(--radius-sm);
		border-bottom-left-radius: var(--radius-sm);
	}

	/* Re-dock the user profile bar */
	.visual-refresh .panels_c48ade {
		background: #232428;
		left: 0;
		bottom: 0;
		width: inherit;
		border-radius: 0;
		border: none;
	}

	.visual-refresh .form_f75fb0 {
		padding-left: 16px;
		padding-right: 16px;
	}

	.guildIcon__48112 {
		border-radius: 50% !important;
	}

	/* Hide "discover" button and the "download app" button from the sidebar */
	div[class*="listItem"]:has(* > div[data-list-item-id="guildsnav___guild-discover-button"]),
	div[class*="listItem"]:has(* > div[data-list-item-id="guildsnav___app-download-button"]) {
		display: none;
	}

	/* Hide Nitro gift button from chat bar */
	button[aria-label="Send a gift"] {
		display: none;
	}

	/* Hide boost bar from annoying servers */
	li:has(> div[data-list-item-id^="channels___boosts-"]) {
		display: none;
	}

	/* Hide valorant promo */
	.container__686c4 {
		display: none;
	}
	
	@supports (grid-template-columns:subgrid) and (white-space-collapse:collapse) {
		.visual-refresh .base_c48ade {
			display: grid;
			grid-template-columns: [start] min-content [guildsEnd] min-content [channelsEnd] 1fr [end];
			grid-template-rows: [top] min-content [noticeEnd] 1fr [end];
			grid-template-areas:
				"guildsList notice       notice  "
				"guildsList channelsList page    ";
		}
	}
	
	:where(.visual-refresh) .menu_c1e9c4 {
		background-color: #111214 !important;
	}
	
	.visual-refresh .wrapper_ef3116 {
		background-color: #1e1f22 !important;
	}
	
	.visual-refresh .container__2637a {
		background: #2b2d31 !important;
	}
	
	.modeSelected__2ea32 .link__2ea32, .modeSelected__2ea32:hover .link__2ea32 {
		background: var(--bg-overlay-selected,var(--background-modifier-selected));
	}
	
	.container_c8ffbb {
		background: #2b2d31 !important;
		border: none !important;
	}
	
	.visual-refresh .chatContent_f75fb0,
	.visual-refresh .container__9293f {
		background: #313338;
	}
	
	.visual-refresh .searchBar__97492 {
		background: #1e1f22;
		border: none;
		padding: 3px 0;
	}
	
	.themedBackground__74017 {
		background: #383a40 !important;
	}
	
	.scrollableContainer__74017 {
		border-radius: var(--radius-sm);
	}
	
	.base_b88801 {
		position: revert;
	}
	
	.form_f75fb0 {
		display: flex;
		flex-direction: column-reverse;
	}
	
	.channelTextArea_f75fb0 {
		margin-bottom: 16px;
	}
	
	:root {
		--notice-background-warning: #f0b232 !important;
		--notice-text-warning: #000000 !important;
		--background-mentioned: #444038 !important;
		--info-warning-foreground: #f0b232 !important;
		--radius-sm: 4px !important;
	}
`

	document.head.appendChild(stylesheet);
	console.log("[tolerable] css appended");
});
