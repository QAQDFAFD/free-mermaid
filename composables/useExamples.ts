// 示例代码按语言分组，避免 vue-i18n 解析花括号的问题
export interface ExampleSet {
  default: string
  flowchart: string
  sequence: string
  class: string
  state: string
  entity: string
  gantt: string
  pie: string
}

export const examples: Record<string, ExampleSet> = {
  en: {
    default: `graph TD
  A[🚀 Start Project] --> B{📋 Have Requirements?}
  B -->|✅ Yes| C[💻 Start Coding]
  B -->|❌ No| D[📝 Gather Requirements]
  D --> B
  C --> E{🧪 Tests Pass?}
  E -->|✅ Yes| F[🎉 Deploy!]
  E -->|❌ No| G[🔧 Fix Bugs]
  G --> E
  
  %% Try editing this code! 🎨
  %% Mermaid Online Free Editor`,
    flowchart: `graph TD
  A[🚀 Start Project] --> B{📋 Have Requirements?}
  B -->|✅ Yes| C[💻 Start Coding]
  B -->|❌ No| D[📝 Gather Requirements]
  D --> B
  C --> E{🧪 Tests Pass?}
  E -->|✅ Yes| F[🎉 Deploy!]
  E -->|❌ No| G[🔧 Fix Bugs]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 User
  participant S as 🖥️ System
  participant D as 💾 Database
  
  U->>S: 📝 Submit Request
  S->>D: 🔍 Query Data
  D-->>S: 📊 Return Results
  S-->>U: ✅ Display Response`,
    class: `classDiagram
  class Animal {
    +String name
    +int age
    +makeSound()
  }
  class Dog {
    +String breed
    +bark()
    +fetch()
  }
  class Cat {
    +String color
    +meow()
    +sleep()
  }
  Animal <|-- Dog
  Animal <|-- Cat`,
    state: `stateDiagram-v2
  [*] --> Idle
  Idle --> Processing: Start Task
  Processing --> Success: Complete
  Processing --> Error: Failed
  Error --> Processing: Retry
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ ITEM : contains
  USER ||--o{ REVIEW : writes
  ITEM ||--o{ REVIEW : receives`,
    gantt: `gantt
  title 📅 Project Timeline
  dateFormat YYYY-MM-DD
  section Planning
  Requirements :done, req, 2024-01-01, 7d
  Design :active, des, after req, 10d
  section Development
  Coding :dev, after des, 14d
  Testing :test, after dev, 7d
  section Launch
  Deploy :deploy, after test, 3d`,
    pie: `pie title 📊 Time Distribution
  "💻 Coding" : 40
  "🔍 Debugging" : 25
  "📚 Learning" : 20
  "☕ Coffee Break" : 15`
  },
  zh: {
    default: `graph TD
  A[🚀 开始项目] --> B{📋 有需求文档吗?}
  B -->|✅ 有| C[💻 开始编码]
  B -->|❌ 没有| D[📝 整理需求]
  D --> B
  C --> E{🧪 测试通过?}
  E -->|✅ 通过| F[🎉 发布上线!]
  E -->|❌ 失败| G[🔧 修复Bug]
  G --> E
  
  %% 试试编辑这段代码! 🎨
  %% Mermaid 在线免费编辑器`,
    flowchart: `graph TD
  A[🚀 开始项目] --> B{📋 有需求文档吗?}
  B -->|✅ 有| C[💻 开始编码]
  B -->|❌ 没有| D[📝 整理需求]
  D --> B
  C --> E{🧪 测试通过?}
  E -->|✅ 通过| F[🎉 发布上线!]
  E -->|❌ 失败| G[🔧 修复Bug]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 用户
  participant S as 🖥️ 系统
  participant D as 💾 数据库
  
  U->>S: 📝 提交请求
  S->>D: 🔍 查询数据
  D-->>S: 📊 返回结果
  S-->>U: ✅ 显示响应`,
    class: `classDiagram
  class Animal {
    +String name
    +int age
    +makeSound()
  }
  class Dog {
    +String breed
    +bark()
    +fetch()
  }
  class Cat {
    +String color
    +meow()
    +sleep()
  }
  Animal <|-- Dog
  Animal <|-- Cat`,
    state: `stateDiagram-v2
  [*] --> Idle
  Idle --> Processing: Start
  Processing --> Success: Done
  Processing --> Error: Failed
  Error --> Processing: Retry
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ PRODUCT : contains
  USER ||--o{ REVIEW : writes
  PRODUCT ||--o{ REVIEW : has`,
    gantt: `gantt
  title 📅 项目时间线
  dateFormat YYYY-MM-DD
  section 规划阶段
  需求分析 :done, req, 2024-01-01, 7d
  设计方案 :active, des, after req, 10d
  section 开发阶段
  编码实现 :dev, after des, 14d
  测试验收 :test, after dev, 7d
  section 上线阶段
  部署发布 :deploy, after test, 3d`,
    pie: `pie title 📊 时间分配
  "💻 编码" : 40
  "🔍 调试" : 25
  "📚 学习" : 20
  "☕ 摸鱼" : 15`
  },
  ru: {
    default: `graph TD
  A[🚀 Начать проект] --> B{📋 Есть требования?}
  B -->|✅ Да| C[💻 Начать кодинг]
  B -->|❌ Нет| D[📝 Собрать требования]
  D --> B
  C --> E{🧪 Тесты пройдены?}
  E -->|✅ Да| F[🎉 Деплой!]
  E -->|❌ Нет| G[🔧 Исправить баги]
  G --> E
  
  %% Попробуйте редактировать! 🎨
  %% Mermaid Онлайн Редактор`,
    flowchart: `graph TD
  A[🚀 Начать проект] --> B{📋 Есть требования?}
  B -->|✅ Да| C[💻 Начать кодинг]
  B -->|❌ Нет| D[📝 Собрать требования]
  D --> B
  C --> E{🧪 Тесты пройдены?}
  E -->|✅ Да| F[🎉 Деплой!]
  E -->|❌ Нет| G[🔧 Исправить баги]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 Пользователь
  participant S as 🖥️ Система
  participant D as 💾 База данных
  
  U->>S: 📝 Отправить запрос
  S->>D: 🔍 Запросить данные
  D-->>S: 📊 Вернуть результаты
  S-->>U: ✅ Показать ответ`,
    class: `classDiagram
  class Animal {
    +String name
    +int age
    +makeSound()
  }
  class Dog {
    +String breed
    +bark()
    +fetch()
  }
  class Cat {
    +String color
    +meow()
    +sleep()
  }
  Animal <|-- Dog
  Animal <|-- Cat`,
    state: `stateDiagram-v2
  [*] --> Idle
  Idle --> Processing: Start
  Processing --> Success: Done
  Processing --> Error: Failed
  Error --> Processing: Retry
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ PRODUCT : contains
  USER ||--o{ REVIEW : writes
  PRODUCT ||--o{ REVIEW : has`,
    gantt: `gantt
  title 📅 График проекта
  dateFormat YYYY-MM-DD
  section Планирование
  Требования :done, req, 2024-01-01, 7d
  Дизайн :active, des, after req, 10d
  section Разработка
  Кодинг :dev, after des, 14d
  Тестирование :test, after dev, 7d
  section Запуск
  Деплой :deploy, after test, 3d`,
    pie: `pie title 📊 Распределение времени
  "💻 Кодинг" : 40
  "🔍 Отладка" : 25
  "📚 Обучение" : 20
  "☕ Перерыв" : 15`
  },
  fr: {
    default: `graph TD
  A[🚀 Démarrer le projet] --> B{📋 Exigences définies?}
  B -->|✅ Oui| C[💻 Commencer à coder]
  B -->|❌ Non| D[📝 Collecter les exigences]
  D --> B
  C --> E{🧪 Tests réussis?}
  E -->|✅ Oui| F[🎉 Déployer!]
  E -->|❌ Non| G[🔧 Corriger les bugs]
  G --> E
  
  %% Essayez de modifier ce code! 🎨
  %% Éditeur Mermaid Gratuit`,
    flowchart: `graph TD
  A[🚀 Démarrer le projet] --> B{📋 Exigences définies?}
  B -->|✅ Oui| C[💻 Commencer à coder]
  B -->|❌ Non| D[📝 Collecter les exigences]
  D --> B
  C --> E{🧪 Tests réussis?}
  E -->|✅ Oui| F[🎉 Déployer!]
  E -->|❌ Non| G[🔧 Corriger les bugs]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 Utilisateur
  participant S as 🖥️ Système
  participant D as 💾 Base de données
  
  U->>S: 📝 Soumettre la demande
  S->>D: 🔍 Interroger les données
  D-->>S: 📊 Retourner les résultats
  S-->>U: ✅ Afficher la réponse`,
    class: `classDiagram
  class Animal {
    +String name
    +int age
    +makeSound()
  }
  class Dog {
    +String breed
    +bark()
    +fetch()
  }
  class Cat {
    +String color
    +meow()
    +sleep()
  }
  Animal <|-- Dog
  Animal <|-- Cat`,
    state: `stateDiagram-v2
  [*] --> Idle
  Idle --> Processing: Start
  Processing --> Success: Done
  Processing --> Error: Failed
  Error --> Processing: Retry
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ PRODUCT : contains
  USER ||--o{ REVIEW : writes
  PRODUCT ||--o{ REVIEW : has`,
    gantt: `gantt
  title 📅 Calendrier du projet
  dateFormat YYYY-MM-DD
  section Planification
  Exigences :done, req, 2024-01-01, 7d
  Conception :active, des, after req, 10d
  section Développement
  Codage :dev, after des, 14d
  Tests :test, after dev, 7d
  section Lancement
  Déploiement :deploy, after test, 3d`,
    pie: `pie title 📊 Répartition du temps
  "💻 Codage" : 40
  "🔍 Débogage" : 25
  "📚 Apprentissage" : 20
  "☕ Pause café" : 15`
  },
  th: {
    default: `graph TD
  A[🚀 เริ่มโปรเจค] --> B{📋 มีความต้องการ?}
  B -->|✅ มี| C[💻 เริ่มเขียนโค้ด]
  B -->|❌ ไม่มี| D[📝 รวบรวมความต้องการ]
  D --> B
  C --> E{🧪 ทดสอบผ่าน?}
  E -->|✅ ผ่าน| F[🎉 เปิดตัว!]
  E -->|❌ ไม่ผ่าน| G[🔧 แก้บัค]
  G --> E
  
  %% ลองแก้ไขโค้ดนี้! 🎨
  %% Mermaid ออนไลน์ฟรี`,
    flowchart: `graph TD
  A[🚀 เริ่มโปรเจค] --> B{📋 มีความต้องการ?}
  B -->|✅ มี| C[💻 เริ่มเขียนโค้ด]
  B -->|❌ ไม่มี| D[📝 รวบรวมความต้องการ]
  D --> B
  C --> E{🧪 ทดสอบผ่าน?}
  E -->|✅ ผ่าน| F[🎉 เปิดตัว!]
  E -->|❌ ไม่ผ่าน| G[🔧 แก้บัค]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 ผู้ใช้
  participant S as 🖥️ ระบบ
  participant D as 💾 ฐานข้อมูล
  
  U->>S: 📝 ส่งคำขอ
  S->>D: 🔍 ค้นหาข้อมูล
  D-->>S: 📊 ส่งผลลัพธ์
  S-->>U: ✅ แสดงการตอบกลับ`,
    class: `classDiagram
  class Animal {
    +String name
    +int age
    +makeSound()
  }
  class Dog {
    +String breed
    +bark()
    +fetch()
  }
  class Cat {
    +String color
    +meow()
    +sleep()
  }
  Animal <|-- Dog
  Animal <|-- Cat`,
    state: `stateDiagram-v2
  [*] --> Idle
  Idle --> Processing: Start
  Processing --> Success: Done
  Processing --> Error: Failed
  Error --> Processing: Retry
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : places
  ORDER ||--|{ PRODUCT : contains
  USER ||--o{ REVIEW : writes
  PRODUCT ||--o{ REVIEW : has`,
    gantt: `gantt
  title 📅 ไทม์ไลน์โปรเจค
  dateFormat YYYY-MM-DD
  section วางแผน
  ความต้องการ :done, req, 2024-01-01, 7d
  ออกแบบ :active, des, after req, 10d
  section พัฒนา
  เขียนโค้ด :dev, after des, 14d
  ทดสอบ :test, after dev, 7d
  section เปิดตัว
  เปิดใช้งาน :deploy, after test, 3d`,
    pie: `pie title 📊 การแบ่งเวลา
  "💻 เขียนโค้ด" : 40
  "🔍 แก้บัค" : 25
  "📚 เรียนรู้" : 20
  "☕ พักผ่อน" : 15`
  }
}

// 获取指定语言的示例，如果不存在则回退到英文
export function getExamples(locale: string): ExampleSet {
  return examples[locale] || examples.en
}

// 获取指定语言和类型的示例
export function getExample(locale: string, type: keyof ExampleSet): string {
  const localeExamples = getExamples(locale)
  return localeExamples[type]
}

// 所有示例类型
export const exampleKeys: (keyof ExampleSet)[] = [
  'default',
  'flowchart',
  'sequence',
  'class',
  'state',
  'entity',
  'gantt',
  'pie'
]
