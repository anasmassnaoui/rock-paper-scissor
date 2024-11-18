
export function classes(...args: (string | undefined | false | null)[]) {
    return args.filter(Boolean).join(' ');
}
