// CLI messages

type Message = ReadonlyArray<ReadonlyArray<string>>

const usage: readonly string[] = ['Usage: %copenapi-exporter [OPTIONS]\n', 'color: green']

const helpMessage: Message = [
	['%cOpenapi exporter\n', 'color: green'],
	['Docs: TODO\n'],
	usage,
	['%cOptions:', 'color: yellow'],
	['%c  -i, --input', 'color: green'],
	['           Input TODO\n'],
	['%c  -o, --output', 'color: green'],
	['           Output TODO\n'],
]

const errorMessage: Message = [
	['%cerror: ', 'color: red', 'invalid arguments\n'],
	usage,
	["For more information, try '--help'."],
]

const printMessage =
	// deno-lint-ignore no-explicit-any
	(printFunction: (...data: any[]) => void) => (message: Message) => {
		message.forEach((message) => printFunction(...message))
	}

const printLogMessage = (message: Message) => printMessage(console.log)(message)
const printWarningMessage = (message: Message) => printMessage(console.warn)(message)
const printErrorMessage = (message: Message) => printMessage(console.error)(message)

type PrintMessage = typeof printMessage

export {
	errorMessage,
	helpMessage,
	printErrorMessage,
	printLogMessage,
	printMessage,
	printWarningMessage,
}
export type { Message, PrintMessage }
