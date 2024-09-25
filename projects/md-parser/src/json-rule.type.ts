export type RuleJson = {
    title: string;
    rule_type: string;
    description: string;
    correct_examples: string[];
    incorrect_examples: string[];
    rule_details: string;
    options: Array<{ option: string; description: string }>;
    fixable: string;
    links: string[];
};
