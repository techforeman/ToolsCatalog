import { observable, action, makeObservable, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";
import { ITool } from "../models/tool";

configure({enforceActions: 'always'});
class ToolStore {
    @observable toolRegistry = new Map();
    @observable tool: ITool | null = null;
    @observable loadingInitial = false;
    @observable submitting = false;
    @observable target = '';

    constructor() {
        makeObservable(this)
    }



    @computed get toolsByCreateOn() {
      return Array.from(this.toolRegistry.values()).slice().sort((a, b) => Date.parse(a.createdOn)  - Date.parse(b.createdOn))
    }

    @action('load tools') loadTools = async () => {
      this.loadingInitial = true;
      try {
        const tools = await agent.Tools.list()
        runInAction(() => {
          tools.forEach(tool => {
            tool.createdOn = tool.createdOn.split('/')[0];
            this.toolRegistry.set(tool.id, tool);
          });
          this.loadingInitial = false;
        })
      } catch (error) {
        runInAction(() => {
          this.loadingInitial = false;
        })
        console.log(error);
      }


    };

    @action('create tool') createTool = async (tool: ITool) => {
      this.submitting = true;
      try {
        await agent.Tools.create(tool);
        runInAction(() => {
          this.toolRegistry.set(tool.id, tool);
        this.submitting = false;
        })
        
      } catch (error) {
        runInAction(() => {
          this.submitting = false;
        })
        console.log(error);
        
      }
    };
    
    @action('edit tool') editTool = async (tool: ITool) => {
      this.submitting = true;
      try {
        await agent.Tools.update(tool);
        runInAction(() => {
          this.toolRegistry.set(tool.id, tool);
        this.tool = tool;
        this.submitting = false;
        });    
      } catch (error) {
        runInAction(() => {
          this.submitting = false;
        });
        console.log(error);
      }
    }

    @action('delete tool') deleteTool = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
      this.submitting = true;
      this.target = event.currentTarget.name;
      try {
        await agent.Tools.delete(id);
        runInAction(() => {
          this.toolRegistry.delete(id);
        this.submitting = false;
        this.target = '';
        });
      }  catch (error) {
        runInAction(() => {
          this.submitting = false;
        this.target = '';
        });
        console.log(error);
        
      }
    }

    @action('load tool') loadTool = async (id: string) => {
      let tool = this.getTool(id);
      if (tool) {
        this.tool = tool;
      } else {
        this.loadingInitial = true;
        try {
          tool = await agent.Tools.details(id);
          runInAction(() => {
            this.tool = tool;
            this.loadingInitial = false;
          })
        } catch (error) {
          runInAction(() => {
            console.log(error);
            this.loadingInitial = false;
          })
          
        }
      }

    }

    @action('clear tool') clearTool = () => {
      this.tool = null;
    }

    getTool = (id: string) => {
      return this.toolRegistry.get(id);
    }


}

export default createContext(new ToolStore());