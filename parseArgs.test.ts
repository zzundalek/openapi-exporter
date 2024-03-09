import { assertEquals } from 'std/assert/mod.ts'
import { parseArgs } from './parseArgs.ts'
import { ExportAction } from './parseArgs.ts'

Deno.test("parseArgs returns help for '-h'", () => {
	const result = parseArgs(['-h'])
	assertEquals(result.type, 'help')
})

Deno.test("parseArgs returns help for '--help'", () => {
	const result = parseArgs(['--help'])
	assertEquals(result.type, 'help')
})

Deno.test("parseArgs returns error for '--help -o'", () => {
	const result = parseArgs(['-h', '-o'])
	assertEquals(result.type, 'error')
})

Deno.test('parseArgs returns error for empty string', () => {
	const result = parseArgs([''])
	assertEquals(result.type, 'error')
})

Deno.test('parseArgs returns error for empty array', () => {
	const result = parseArgs([])
	assertEquals(result.type, 'error')
})

Deno.test('parseArgs returns error for mission input value', () => {
	const result = parseArgs(['--i', '--o', 'output_file'])
	assertEquals(result.type, 'error')
})

Deno.test('parseArgs returns error for mixed export and help', () => {
	const result = parseArgs(['--i', 'input_file', '--o', 'output_file', '-h'])
	assertEquals(result.type, 'error')
})

Deno.test('parseArgs returns export for valid args', () => {
	const result = parseArgs(['--i', 'input_file', '--o', 'output_file']) as ExportAction
	assertEquals(result.type, 'export')
	assertEquals(result.input, 'input_file')
	assertEquals(result.output, 'output_file')
})
