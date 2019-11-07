import Vue from 'vue'

export declare class CIcon extends Vue {
  name: string
  content: [string, Array<string>]
  size: string
  customClasses: [string, Array<any>, object]
}

import { PluginFunction } from 'vue'
export interface CIconPluginPlugin {
  install: PluginFunction<Function>
}
export declare const CIconPlugin: CIconPluginPlugin
