import * as ModuleAlias from 'module-alias';

export function createModuleAlias(): void {
  ModuleAlias.addAliases({
    '@': __dirname,
  });
}
