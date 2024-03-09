import { parseArgs as stdParseArgs } from 'std/cli/parse_args.ts'
import { z } from 'zod'

const basicSchema = z.object({
	_: z.array(z.string()).max(0),
})

const partialHelpSchema = z.object({
	help: z.boolean().refine((val) => val === true),
	h: z.boolean(),
})

const partialExportSchema = z.object({
	help: z.boolean().refine((val) => val === false),
	h: z.boolean(),
	output: z.string().min(1),
	o: z.string(),
	input: z.string().min(1),
	i: z.string(),
})

const helpSchema = partialHelpSchema.merge(basicSchema).strict()
const exportSchema = partialExportSchema.merge(basicSchema).strict()

interface ExportAction {
	type: 'export'
	output: string
	input: string
}

interface HelpAction {
	type: 'help'
}

interface ErrorAction {
	type: 'error'
}

type Action = ExportAction | HelpAction | ErrorAction

const parseArgs = (cliArgs: string[]): Readonly<Action> => {
	const rawArgs = stdParseArgs(cliArgs, {
		string: ['output', 'input'],
		boolean: ['help'],
		alias: { 'help': ['h'], 'output': ['o'], 'input': ['i'] },
	})

	const { success: isHelp } = helpSchema.safeParse(rawArgs)
	if (isHelp) {
		return { type: 'help' }
	}

	const exportResult = exportSchema.safeParse(rawArgs)
	if (exportResult.success) {
		const { input, output } = exportResult.data
		return { type: 'export', input, output }
	}

	return { type: 'error' }
}

export type { Action, ErrorAction, ExportAction, HelpAction }
export { parseArgs }
