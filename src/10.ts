const enum TriggerType {
    Character,
    Any,
    End,
}

interface Transition {
    triggerType: TriggerType;

    trigger: string;

    next: Transition[];
}

function matchTrigger(transition: Transition, ch: string): boolean {
    switch (transition.triggerType) {
        case TriggerType.Character:
            return transition.trigger === ch;
        case TriggerType.Any:
            return true;
        default:
            return false;
    }
}

function appendTransition(leaves: Transition[], value: Transition): boolean {
    for (const leaf of leaves) {
        // collapse 'a*a*'
        if (leaf.next.includes(leaf) &&
            value.next.includes(value) &&
            leaf.trigger === value.trigger) {
            return false;
        }
    }

    for (const leaf of leaves) {
        leaf.next.push(value);
    }

    return true;
}

function buildTransitionTree(p: string): Transition[] {
    const root: Transition = {
        triggerType: TriggerType.End,
        trigger: '',
        next: [],
    }

    let leaves: Transition[] = [root];
    let temp: Transition | undefined;

    for (const ch of p) {
        switch (ch) {
            case '.':
                /* istanbul ignore else */
                if (temp) {
                    for (const leaf of leaves) {
                        leaf.next.push(temp);
                    }
                    leaves = [temp];
                }

                temp = {
                    triggerType: TriggerType.Any,
                    trigger: '.',
                    next: [],
                };
                break;
            case '*':
                /* istanbul ignore else */
                if (temp) {
                    temp.next.push(temp);
                    if (appendTransition(leaves, temp)) {
                        leaves.push(temp);
                    }
                    temp = undefined;
                }
                break;
            default:
                if (temp) {
                    for (const leaf of leaves) {
                        leaf.next.push(temp);
                    }
                    leaves = [temp];
                }

                temp = {
                    triggerType: TriggerType.Character,
                    trigger: ch,
                    next: [],
                };
                break;
        }
    }

    if (temp) {
        for (const leaf of leaves) {
            leaf.next.push(temp);
        }
        leaves = [temp];
    }

    const end: Transition = {
        triggerType: TriggerType.End,
        trigger: '',
        next: [],
    };
    for (const leaf of leaves) {
        leaf.next.push(end);
    }

    return root.next;
}

export function isMatch(s: string, p: string): boolean {
    let leaves: Transition[] = buildTransitionTree(p);
    let temp: Transition[] = leaves;

    for (const ch of s) {
        if (temp.length === 0) {
            return false;
        }

        temp = [];
        for (const item of leaves) {
            if (matchTrigger(item, ch)) {
                temp = temp.concat(item.next);
            }
        }

        leaves = temp;
    }

    for (const item of leaves) {
        if (item.triggerType === TriggerType.End) {
            return true;
        }
    }

    return false;
}
