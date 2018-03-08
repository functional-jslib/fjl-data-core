export const log = console.log.bind(console),
    peek =  (...args) => (log(...args), args.pop());
