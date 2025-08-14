export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-accent-50 to-primary-50 py-20">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-800 mb-6">
            Euro à Porter
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 mb-8 font-serif italic">
            「ユーロを着よう！」
          </p>
          <p className="text-lg text-primary-700 mb-12 leading-relaxed">
            天然素材・丁寧な縫製が生むアイテムの美しさ。<br />
            ロープライスで誰でも着られるユーロヴィンテージの世界へ。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/items"
              className="btn-primary text-lg px-8 py-3"
            >
              アイテムを見る
            </a>
            <a
              href="/about"
              className="btn-secondary text-lg px-8 py-3"
            >
              ユーロヴィンテージとは
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-200 rounded-full opacity-20"></div>
    </section>
  )
}
