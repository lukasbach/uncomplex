export interface UncomplexEntityInterface<Original = any, Simplified extends object = object, SimplifyState extends object = any, ParseState extends object = SimplifyState> {
  entityId: string;
  applicableClasses?: any[];
  isApplicable?: (object: Original) => boolean;
  simplifyObject: (object: Original, key: string | number | undefined, state: Partial<SimplifyState>) => Simplified;
  parseObject: (object: Simplified, key: string | number | undefined, state: Partial<ParseState>) => Original;
}