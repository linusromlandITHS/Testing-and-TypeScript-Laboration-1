type Options = {
	categories: OptionItem[];
	tags: OptionItem[];
	regions: OptionItem[];
	difficulties: OptionItem[];
};

type OptionItem = {
	label: string;
	value: string;
};

export type { Options, OptionItem };
