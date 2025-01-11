(module
	(import "console" "logInt32" (func $log_int (param i32)))
	(import "console" "putCharAscii" (func $put_char (param i32)))
	(func $add (param $a i32) (param $b i32) (result i32)
		local.get $a
		local.get $b
		i32.add
	)
	(func $main (result i32)
		i32.const 1
		i32.const 2
		call $add
		i32.const 1
		call $add
		call $log_int
		
		i32.const 65
		call $put_char
		i32.const 0
	)
	
	(export "main" (func $main))
)