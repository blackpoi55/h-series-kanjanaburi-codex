


let ClassLabelDefault = 'label px-0 py-1 whitespace-nowrap truncate '
let ClassInputDefault = 'w-full px-2 placeholder:italic placeholder:text-slate-400 block  w-full border bg-white border-[#cccccc] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'


export const InputCheckbox = (
	{
		label = '', htmlLabel = '', textCheckbox = '', value = '', name = '', checked, checkeds = [], onchange, boxClass, classLabel, classBoxInput = '', id, option = [],
		xl = null, lg = null, sm = null, xs = null, disabled = false
	}) => {
	const nullLabel = xl ? 'lg:mt-[36px]' : lg ? 'lg:mt-[36px]' : sm ? 'lg:mt-[29px]' : xs ? 'lg:mt-6' : 'lg:mt-[32px]'

	const onchangeMultiple = (id) => {
		let values = [...checkeds]

		let index = values.findIndex(e => e === id)

		if (index >= 0) {
			values.splice(index, 1)
		} else {
			values.push(id)
		}

		onchange([...values])
	}

	return <>
		{option.length === 0 && <div className={`${boxClass}`}>
			{label ? <label className={`${ClassLabelDefault} ${classLabel}`}>{label}</label> : ''}
			{htmlLabel ? <label className={`${ClassLabelDefault} ${classLabel}`} dangerouslySetInnerHTML={{ __html: htmlLabel }} /> : ''}
			<div className={`flex items-center ${(label === '' && htmlLabel === '') && nullLabel}`}>
				<input id={id} type="checkbox" value={value} name={name} checked={!!checked} onChange={(e) => onchange ? onchange(e.target.checked) : {}}
					className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2  cursor-pointer" disabled={!!disabled} />
				<label htmlFor={id} className={'ml-2 w-auto truncate cursor-pointer'}>{textCheckbox}</label>
			</div>
		</div>}

		{option.length > 0 && <div className={`${boxClass} items-center`}>
			{label ? <label className={`${ClassLabelDefault} ${classLabel}`}>{label}</label> : ''}
			{htmlLabel ? <label className={`${ClassLabelDefault} ${classLabel}`} dangerouslySetInnerHTML={{ __html: htmlLabel }} /> : ''}
			<div className={`flex gap-3 mt-2`}>
				{option && option.length > 0 && option.map((e, index) => {
					return <div key={`${name}-${index}`} className={`flex items-center ${(label === '' && htmlLabel === '') && nullLabel}`}>
						<input id={`${name}-${index}`} type="checkbox" value={e.id} name={`${name}-${index}`}
							checked={(checkeds && checkeds?.length > 0 && Array.isArray(checkeds)) ? (checkeds?.findIndex(v => v === e.id) >= 0) : ''}
							onChange={(v) => onchange ? onchangeMultiple(e.id) : {}}
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2  cursor-pointer" disabled={!!disabled} />
						<label htmlFor={`${name}-${index}`} className={'ml-2 w-auto  cursor-pointer'}>{e.name}</label>
					</div>
				})}
			</div>
		</div>}
	</>
}