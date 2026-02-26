import type { IdentityNode } from '$lib/utils/auth/types'

const TOKEN_GROUP = 'default'

/**
 * Group the inputs accodingly so each group is its own form,
 * but add the csrf token to all groups.
 * This token comes in the default group
 **/

export const groupNodes = (nodes: IdentityNode[]) =>
	nodes.reduce(
		(acc, el, _, arr) => {
			const index = acc.findIndex((_el) => _el.group === el.group)
			if (el.group !== TOKEN_GROUP) {
				if (index === -1) {
					acc.push({ group: el.group, nodes: [el] })
					/**
					 * find the index of the new group to append the token
					 **/
					const new_index = acc.findIndex((_el) => _el.group === el.group)
					arr
						.filter((_el) => _el.group === TOKEN_GROUP)
						.forEach((_el) => acc[new_index].nodes.push(_el))
					return acc
				}
				acc[index].nodes.push(el)
			}
			return acc
		},
		[] as { group: string; nodes: IdentityNode[] }[]
	)
