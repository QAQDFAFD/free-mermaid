import type { ExampleSet } from './useExamples'

// Class and field identifiers remain code identifiers in every language.
const classExample = `classDiagram
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
  Animal <|-- Cat`

function withDefault(values: Omit<ExampleSet, 'default'>, tip: string): ExampleSet {
  return { ...values, default: `${values.flowchart}\n\n  %% ${tip}` }
}

export const trafficLocaleExamples: Record<string, ExampleSet> = {
  es: withDefault({
    flowchart: `graph TD
  A[🚀 Iniciar proyecto] --> B{📋 Hay requisitos?}
  B -->|✅ Sí| C[💻 Empezar a programar]
  B -->|❌ No| D[📝 Recopilar requisitos]
  D --> B
  C --> E{🧪 Pruebas correctas?}
  E -->|✅ Sí| F[🎉 Publicar]
  E -->|❌ No| G[🔧 Corregir errores]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 Usuario
  participant S as 🖥️ Sistema
  participant D as 💾 Base de datos
  U->>S: 📝 Enviar solicitud
  S->>D: 🔍 Consultar datos
  D-->>S: 📊 Devolver resultados
  S-->>U: ✅ Mostrar respuesta`,
    class: classExample,
    state: `stateDiagram-v2
  state "Inactivo" as Idle
  state "Procesando" as Processing
  state "Completado" as Success
  state "Error" as Error
  [*] --> Idle
  Idle --> Processing: Iniciar tarea
  Processing --> Success: Completar
  Processing --> Error: Fallar
  Error --> Processing: Reintentar
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : realiza
  ORDER ||--|{ ITEM : contiene
  USER ||--o{ REVIEW : escribe
  ITEM ||--o{ REVIEW : recibe`,
    gantt: `gantt
  title 📅 Cronograma del proyecto
  dateFormat YYYY-MM-DD
  section Planificación
  Requisitos :done, req, 2026-10-01, 7d
  Diseño :active, des, after req, 10d
  section Desarrollo
  Programación :dev, after des, 14d
  Pruebas :test, after dev, 7d
  section Publicación
  Despliegue :deploy, after test, 3d`,
    pie: `pie title 📊 Distribución del tiempo
  "💻 Programación" : 40
  "🔍 Depuración" : 25
  "📚 Aprendizaje" : 20
  "☕ Descanso" : 15`
  }, '¡Prueba a editar este código! 🎨'),
  pt: withDefault({
    flowchart: `graph TD
  A[🚀 Iniciar projeto] --> B{📋 Há requisitos?}
  B -->|✅ Sim| C[💻 Começar a programar]
  B -->|❌ Não| D[📝 Reunir requisitos]
  D --> B
  C --> E{🧪 Testes passaram?}
  E -->|✅ Sim| F[🎉 Publicar]
  E -->|❌ Não| G[🔧 Corrigir erros]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 Usuário
  participant S as 🖥️ Sistema
  participant D as 💾 Banco de dados
  U->>S: 📝 Enviar solicitação
  S->>D: 🔍 Consultar dados
  D-->>S: 📊 Retornar resultados
  S-->>U: ✅ Exibir resposta`,
    class: classExample,
    state: `stateDiagram-v2
  state "Ocioso" as Idle
  state "Processando" as Processing
  state "Concluído" as Success
  state "Erro" as Error
  [*] --> Idle
  Idle --> Processing: Iniciar tarefa
  Processing --> Success: Concluir
  Processing --> Error: Falhar
  Error --> Processing: Tentar novamente
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : realiza
  ORDER ||--|{ ITEM : "contém"
  USER ||--o{ REVIEW : escreve
  ITEM ||--o{ REVIEW : recebe`,
    gantt: `gantt
  title 📅 Cronograma do projeto
  dateFormat YYYY-MM-DD
  section Planejamento
  Requisitos :done, req, 2026-10-01, 7d
  Design :active, des, after req, 10d
  section Desenvolvimento
  Programação :dev, after des, 14d
  Testes :test, after dev, 7d
  section Lançamento
  Publicação :deploy, after test, 3d`,
    pie: `pie title 📊 Distribuição do tempo
  "💻 Programação" : 40
  "🔍 Depuração" : 25
  "📚 Aprendizado" : 20
  "☕ Pausa" : 15`
  }, 'Experimente editar este código! 🎨'),
  id: withDefault({
    flowchart: `graph TD
  A[🚀 Mulai proyek] --> B{📋 Ada kebutuhan?}
  B -->|✅ Ya| C[💻 Mulai menulis kode]
  B -->|❌ Tidak| D[📝 Kumpulkan kebutuhan]
  D --> B
  C --> E{🧪 Pengujian berhasil?}
  E -->|✅ Ya| F[🎉 Luncurkan]
  E -->|❌ Tidak| G[🔧 Perbaiki kesalahan]
  G --> E`,
    sequence: `sequenceDiagram
  participant U as 👤 Pengguna
  participant S as 🖥️ Sistem
  participant D as 💾 Basis data
  U->>S: 📝 Kirim permintaan
  S->>D: 🔍 Cari data
  D-->>S: 📊 Kembalikan hasil
  S-->>U: ✅ Tampilkan respons`,
    class: classExample,
    state: `stateDiagram-v2
  state "Siaga" as Idle
  state "Memproses" as Processing
  state "Berhasil" as Success
  state "Kesalahan" as Error
  [*] --> Idle
  Idle --> Processing: Mulai tugas
  Processing --> Success: Selesai
  Processing --> Error: Gagal
  Error --> Processing: Coba lagi
  Success --> [*]`,
    entity: `erDiagram
  USER ||--o{ ORDER : membuat
  ORDER ||--|{ ITEM : berisi
  USER ||--o{ REVIEW : menulis
  ITEM ||--o{ REVIEW : menerima`,
    gantt: `gantt
  title 📅 Jadwal proyek
  dateFormat YYYY-MM-DD
  section Perencanaan
  Kebutuhan :done, req, 2026-10-01, 7d
  Desain :active, des, after req, 10d
  section Pengembangan
  Menulis kode :dev, after des, 14d
  Pengujian :test, after dev, 7d
  section Peluncuran
  Rilis :deploy, after test, 3d`,
    pie: `pie title 📊 Pembagian waktu
  "💻 Menulis kode" : 40
  "🔍 Memperbaiki kesalahan" : 25
  "📚 Belajar" : 20
  "☕ Istirahat" : 15`
  }, 'Coba edit kode ini! 🎨')
}
