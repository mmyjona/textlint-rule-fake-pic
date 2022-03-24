【案例说明】新加 workflow 关键字，用于描述 stage 之间的依赖关系，如下图所示：
```
workflow:
  stages:
    编译:
      requires:
        - 代码检测
        
    部署:
      requires:
        - 编译
        
    集成测试:
      requires:
        - 代码检测
```
上述描述表示：编译 依赖 代码检测、部署 依赖 编译 、集成测试 依赖 代码检测。
完整 yml 如下图所示：
```
stages:
  - 编译
  - 部署
  - 集成测试
  - 代码检测
  
构建任务:
  stage: 编译 
  plugin: SYSTEM-CHECK

部署任务:
  stage: 部署
  plugin: SYSTEM-CHECK
  
测试任务:
  stage: 集成测试
  plugin: SYSTEM-CHECK
  
PMD 任务:
  stage: 代码检测
  plugin: SYSTEM-CHECK  
  
STC任务:
  stage: 代码检测
  plugin: SYSTEM-CHECK    
  
workflow:
  stages:
    编译:
      requires:
        - 代码检测
        
    部署:
      requires:
        - 编译
        
    集成测试:
      requires:
        - 代码检测
```