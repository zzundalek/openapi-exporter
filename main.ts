import { errorMessage, helpMessage } from './cliMessages.ts'
import { printLogMessage } from './cliMessages.ts'
import { parseArgs } from './parseArgs.ts'

const action = parseArgs(Deno.args)

switch (action.type) {
	case 'help':
		printLogMessage(helpMessage)
		break
	case 'error':
		printLogMessage(errorMessage)
		break
	case 'export':
		break
}
