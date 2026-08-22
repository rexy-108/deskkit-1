import { useState, useRef, useEffect, useCallback } from "react";

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    tools: "Tools", recent: "Recent", seeAll: "See all", showLess: "Show less", open: "Open",
    home: "Home", settings: "Settings", prefsInfo: "Preferences & info",
    appearance: "Appearance", darkMode: "Dark Mode", darkOn: "On — dark theme active", darkOff: "Off — light theme active",
    language: "Language", about: "About", version: "Version 1.0.0", madeBy: "Made by Rohan",
    dropFiles: "Drop files or", browse: "browse", processing: "Processing…", downloadStarted: "Download started!",
    downloadAgain: "Download again", newFile: "New File",
    pen: "Pen", highlight: "Highlight", text: "Text", erase: "Erase", clear: "Clear",
    clickToAddText: "Click anywhere to add text", replace: "Replace", page: "Page",
    toolImgLabel: "Image to PDF", toolImgDesc: "Convert JPG, PNG, WEBP images into a single PDF document",
    toolCompressLabel: "Compress PDF", toolCompressDesc: "Reduce file size without compromising quality",
    toolMergeLabel: "Merge PDF", toolMergeDesc: "Combine multiple PDFs into one seamless file",
    toolToodleLabel: "Toodle", toolToodleDesc: "Draw, annotate and doodle freely on any PDF",
    hintImgToPdf: "Photos, text files & DOCX supported", hintCompress: "PDF files only",
    hintMerge: "Select multiple PDFs to combine", hintToodle: "Upload a PDF to doodle on",
    actionImgToPdf: "Convert to PDF", actionCompress: "Compress PDF", actionMerge: "Merge PDFs", actionToodle: "Save Toodle",
    descImgToPdf: "Converts photos, text files, and DOCX documents into a PDF.",
    descCompress: "Compress the PDF size to low without quality loss.",
    descMerge: "Combines multiple PDFs into one file.",
    descToodle: "Draw, annotate and doodle freely on any PDF page.",
  },
  es: {
    tools: "Herramientas", recent: "Recientes", seeAll: "Ver todo", showLess: "Ver menos", open: "Abrir",
    home: "Inicio", settings: "Ajustes", prefsInfo: "Preferencias e info",
    appearance: "Apariencia", darkMode: "Modo oscuro", darkOn: "Activado — tema oscuro", darkOff: "Desactivado — tema claro",
    language: "Idioma", about: "Acerca de", version: "Versión 1.0.0", madeBy: "Hecho por Rohan",
    dropFiles: "Suelta archivos o", browse: "elige", processing: "Procesando…", downloadStarted: "¡Descarga iniciada!",
    downloadAgain: "Descargar de nuevo", newFile: "Nuevo archivo",
    pen: "Pluma", highlight: "Resaltar", text: "Texto", erase: "Borrar", clear: "Limpiar",
    clickToAddText: "Haz clic para añadir texto", replace: "Reemplazar", page: "Página",
    toolImgLabel: "Imagen a PDF", toolImgDesc: "Convierte imágenes JPG, PNG, WEBP en un PDF",
    toolCompressLabel: "Comprimir PDF", toolCompressDesc: "Reduce el tamaño sin perder calidad",
    toolMergeLabel: "Unir PDF", toolMergeDesc: "Combina varios PDFs en un solo archivo",
    toolToodleLabel: "Toodle", toolToodleDesc: "Dibuja y anota libremente en cualquier PDF",
    hintImgToPdf: "Fotos, texto y DOCX admitidos", hintCompress: "Solo archivos PDF",
    hintMerge: "Selecciona varios PDFs para combinar", hintToodle: "Sube un PDF para dibujar",
    actionImgToPdf: "Convertir a PDF", actionCompress: "Comprimir PDF", actionMerge: "Unir PDFs", actionToodle: "Guardar Toodle",
    descImgToPdf: "Convierte fotos y documentos en PDF.", descCompress: "Comprime el PDF sin pérdida de calidad.",
    descMerge: "Combina varios PDFs en uno.", descToodle: "Dibuja y anota en cualquier página PDF.",
  },
  fr: {
    tools: "Outils", recent: "Récents", seeAll: "Voir tout", showLess: "Voir moins", open: "Ouvrir",
    home: "Accueil", settings: "Paramètres", prefsInfo: "Préférences & infos",
    appearance: "Apparence", darkMode: "Mode sombre", darkOn: "Activé — thème sombre", darkOff: "Désactivé — thème clair",
    language: "Langue", about: "À propos", version: "Version 1.0.0", madeBy: "Fait par Rohan",
    dropFiles: "Déposez des fichiers ou", browse: "parcourir", processing: "Traitement…", downloadStarted: "Téléchargement lancé !",
    downloadAgain: "Télécharger à nouveau", newFile: "Nouveau fichier",
    pen: "Stylo", highlight: "Surligner", text: "Texte", erase: "Effacer", clear: "Effacer tout",
    clickToAddText: "Cliquez pour ajouter du texte", replace: "Remplacer", page: "Page",
    toolImgLabel: "Image en PDF", toolImgDesc: "Convertit des images JPG, PNG, WEBP en PDF",
    toolCompressLabel: "Compresser PDF", toolCompressDesc: "Réduit la taille sans perte de qualité",
    toolMergeLabel: "Fusionner PDF", toolMergeDesc: "Combine plusieurs PDFs en un seul fichier",
    toolToodleLabel: "Toodle", toolToodleDesc: "Dessinez et annotez librement sur un PDF",
    hintImgToPdf: "Photos, textes et DOCX pris en charge", hintCompress: "Fichiers PDF uniquement",
    hintMerge: "Sélectionnez plusieurs PDFs", hintToodle: "Importez un PDF pour dessiner",
    actionImgToPdf: "Convertir en PDF", actionCompress: "Compresser PDF", actionMerge: "Fusionner PDFs", actionToodle: "Enregistrer Toodle",
    descImgToPdf: "Convertit photos et documents en PDF.", descCompress: "Compresse le PDF sans perte.",
    descMerge: "Fusionne plusieurs PDFs en un.", descToodle: "Dessinez sur n'importe quelle page PDF.",
  },
  de: {
    tools: "Werkzeuge", recent: "Zuletzt", seeAll: "Alle anzeigen", showLess: "Weniger", open: "Öffnen",
    home: "Start", settings: "Einstellungen", prefsInfo: "Einstellungen & Info",
    appearance: "Erscheinungsbild", darkMode: "Dunkler Modus", darkOn: "An — dunkles Design", darkOff: "Aus — helles Design",
    language: "Sprache", about: "Über", version: "Version 1.0.0", madeBy: "Erstellt von Rohan",
    dropFiles: "Dateien ablegen oder", browse: "durchsuchen", processing: "Verarbeitung…", downloadStarted: "Download gestartet!",
    downloadAgain: "Erneut herunterladen", newFile: "Neue Datei",
    pen: "Stift", highlight: "Markieren", text: "Text", erase: "Löschen", clear: "Leeren",
    clickToAddText: "Klicken um Text hinzuzufügen", replace: "Ersetzen", page: "Seite",
    toolImgLabel: "Bild zu PDF", toolImgDesc: "Konvertiert JPG, PNG, WEBP-Bilder in PDF",
    toolCompressLabel: "PDF komprimieren", toolCompressDesc: "Reduziert Dateigröße ohne Qualitätsverlust",
    toolMergeLabel: "PDF zusammenführen", toolMergeDesc: "Mehrere PDFs zu einer Datei zusammenführen",
    toolToodleLabel: "Toodle", toolToodleDesc: "Zeichne und kommentiere auf jedem PDF",
    hintImgToPdf: "Fotos, Text und DOCX unterstützt", hintCompress: "Nur PDF-Dateien",
    hintMerge: "Mehrere PDFs auswählen", hintToodle: "PDF hochladen zum Zeichnen",
    actionImgToPdf: "In PDF konvertieren", actionCompress: "PDF komprimieren", actionMerge: "PDFs zusammenführen", actionToodle: "Toodle speichern",
    descImgToPdf: "Konvertiert Fotos und Dokumente in PDF.", descCompress: "Komprimiert PDF ohne Qualitätsverlust.",
    descMerge: "Führt mehrere PDFs zusammen.", descToodle: "Zeichne auf jeder PDF-Seite.",
  },
  zh: {
    tools: "工具", recent: "最近", seeAll: "查看全部", showLess: "收起", open: "打开",
    home: "主页", settings: "设置", prefsInfo: "偏好与信息",
    appearance: "外观", darkMode: "深色模式", darkOn: "已开启 — 深色主题", darkOff: "已关闭 — 浅色主题",
    language: "语言", about: "关于", version: "版本 1.0.0", madeBy: "由 Rohan 制作",
    dropFiles: "拖放文件或", browse: "浏览", processing: "处理中…", downloadStarted: "下载已开始！",
    downloadAgain: "再次下载", newFile: "新文件",
    pen: "画笔", highlight: "高亮", text: "文字", erase: "橡皮擦", clear: "清除",
    clickToAddText: "点击任意位置添加文字", replace: "替换", page: "页面",
    toolImgLabel: "图片转PDF", toolImgDesc: "将 JPG、PNG、WEBP 图片转换为 PDF",
    toolCompressLabel: "压缩PDF", toolCompressDesc: "在不降低质量的情况下减小文件大小",
    toolMergeLabel: "合并PDF", toolMergeDesc: "将多个PDF合并为一个文件",
    toolToodleLabel: "涂鸦", toolToodleDesc: "在任意PDF上自由绘图和注释",
    hintImgToPdf: "支持照片、文本和DOCX", hintCompress: "仅支持PDF文件",
    hintMerge: "选择多个PDF进行合并", hintToodle: "上传PDF进行涂鸦",
    actionImgToPdf: "转换为PDF", actionCompress: "压缩PDF", actionMerge: "合并PDFs", actionToodle: "保存涂鸦",
    descImgToPdf: "将照片和文档转换为PDF。", descCompress: "无损压缩PDF文件。",
    descMerge: "将多个PDF合并为一个。", descToodle: "在任意PDF页面上绘图。",
  },
  ar: {
    tools: "الأدوات", recent: "الأخيرة", seeAll: "عرض الكل", showLess: "عرض أقل", open: "فتح",
    home: "الرئيسية", settings: "الإعدادات", prefsInfo: "التفضيلات والمعلومات",
    appearance: "المظهر", darkMode: "الوضع المظلم", darkOn: "مفعّل — سمة داكنة", darkOff: "معطّل — سمة فاتحة",
    language: "اللغة", about: "حول", version: "الإصدار 1.0.0", madeBy: "صنعه روهان",
    dropFiles: "أسقط الملفات أو", browse: "تصفح", processing: "جارٍ المعالجة…", downloadStarted: "بدأ التنزيل!",
    downloadAgain: "تنزيل مجدداً", newFile: "ملف جديد",
    pen: "قلم", highlight: "تظليل", text: "نص", erase: "محو", clear: "مسح",
    clickToAddText: "انقر في أي مكان لإضافة نص", replace: "استبدال", page: "صفحة",
    toolImgLabel: "صورة إلى PDF", toolImgDesc: "تحويل صور JPG وPNG وWEBP إلى PDF",
    toolCompressLabel: "ضغط PDF", toolCompressDesc: "تقليل حجم الملف دون فقدان الجودة",
    toolMergeLabel: "دمج PDF", toolMergeDesc: "دمج عدة ملفات PDF في ملف واحد",
    toolToodleLabel: "توديل", toolToodleDesc: "ارسم وعلّق بحرية على أي PDF",
    hintImgToPdf: "الصور والنصوص وDOCX مدعومة", hintCompress: "ملفات PDF فقط",
    hintMerge: "اختر عدة ملفات PDF للدمج", hintToodle: "ارفع ملف PDF للرسم عليه",
    actionImgToPdf: "تحويل إلى PDF", actionCompress: "ضغط PDF", actionMerge: "دمج PDFs", actionToodle: "حفظ التوديل",
    descImgToPdf: "يحوّل الصور والمستندات إلى PDF.", descCompress: "يضغط PDF دون فقدان جودة.",
    descMerge: "يدمج عدة PDFs في ملف واحد.", descToodle: "ارسم على أي صفحة PDF.",
  },
  pt: {
    tools: "Ferramentas", recent: "Recentes", seeAll: "Ver tudo", showLess: "Ver menos", open: "Abrir",
    home: "Início", settings: "Configurações", prefsInfo: "Preferências & info",
    appearance: "Aparência", darkMode: "Modo escuro", darkOn: "Ativo — tema escuro", darkOff: "Inativo — tema claro",
    language: "Idioma", about: "Sobre", version: "Versão 1.0.0", madeBy: "Feito por Rohan",
    dropFiles: "Solte arquivos ou", browse: "procure", processing: "Processando…", downloadStarted: "Download iniciado!",
    downloadAgain: "Baixar novamente", newFile: "Novo arquivo",
    pen: "Caneta", highlight: "Destacar", text: "Texto", erase: "Apagar", clear: "Limpar",
    clickToAddText: "Clique em qualquer lugar para adicionar texto", replace: "Substituir", page: "Página",
    toolImgLabel: "Imagem para PDF", toolImgDesc: "Converte imagens JPG, PNG, WEBP em PDF",
    toolCompressLabel: "Comprimir PDF", toolCompressDesc: "Reduz o tamanho sem perder qualidade",
    toolMergeLabel: "Mesclar PDF", toolMergeDesc: "Combina vários PDFs em um único arquivo",
    toolToodleLabel: "Toodle", toolToodleDesc: "Desenhe e anote livremente em qualquer PDF",
    hintImgToPdf: "Fotos, textos e DOCX suportados", hintCompress: "Apenas arquivos PDF",
    hintMerge: "Selecione vários PDFs para combinar", hintToodle: "Envie um PDF para desenhar",
    actionImgToPdf: "Converter para PDF", actionCompress: "Comprimir PDF", actionMerge: "Mesclar PDFs", actionToodle: "Salvar Toodle",
    descImgToPdf: "Converte fotos e documentos em PDF.", descCompress: "Comprime PDF sem perda de qualidade.",
    descMerge: "Combina vários PDFs em um.", descToodle: "Desenhe em qualquer página PDF.",
  },
};

type Tool = "image-to-pdf" | "compress" | "merge" | "toodle" | null;

const tools = [
  {
    id: "image-to-pdf" as const,
    label: "Image to PDF",
    abbr: "IMG",
    desc: "Convert JPG, PNG, WEBP images into a single PDF document",
    icon: ImageToPdfIcon,
    accent: "#ff5c1a",
    tag: "CONVERT",
  },
  {
    id: "compress" as const,
    label: "Compress PDF",
    abbr: "ZIP",
    desc: "Reduce file size without compromising quality",
    icon: CompressIcon,
    accent: "#3b82f6",
    tag: "OPTIMIZE",
  },
  {
    id: "merge" as const,
    label: "Merge PDF",
    abbr: "MRG",
    desc: "Combine multiple PDFs into one seamless file",
    icon: MergeIcon,
    accent: "#22c55e",
    tag: "COMBINE",
  },
  {
    id: "toodle" as const,
    label: "Toodle",
    abbr: "TDL",
    desc: "Draw, annotate and doodle freely on any PDF",
    icon: ToodleIcon,
    accent: "#f59e0b",
    tag: "DOODLE",
  },
];

function ImageToPdfIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="4" width="16" height="20" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M6 8h8M6 12h6M6 16h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="21" cy="8" r="5" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.6" />
      <path d="M21 6v4M19 8h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CompressIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="2" width="20" height="24" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M8 8h12M8 13h12M8 18h8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 18l-3 3 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MergeIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="2" y="4" width="10" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <rect x="16" y="4" width="10" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <path d="M7 18v4M21 18v4M7 22h14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="22" r="1.5" fill={color} />
    </svg>
  );
}

function ToodleIcon({ color }: { color: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 20c3-6 6-10 9-10s4 4 6 4 3-2 5-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="10" r="2" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />
      <path d="M14 22l2-2 2 2" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="8" r="2" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

const toolMeta: Record<string, { accept: string; hint: string; actionLabel: string; defaultBaseName: (files: File[]) => string }> = {
  "image-to-pdf": {
    accept: "image/jpeg,image/png,image/webp,image/gif,.txt,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    hint: "Photos, text files & DOCX supported",
    actionLabel: "Convert to PDF",
    defaultBaseName: (files) => files[0]?.name.replace(/\.[^.]+$/, "") ?? "document",
  },
  compress: {
    accept: "application/pdf",
    hint: "PDF files only",
    actionLabel: "Compress PDF",
    defaultBaseName: (files) => (files[0]?.name.replace(/\.pdf$/i, "") ?? "document") + "_compressed",
  },
  merge: {
    accept: "application/pdf",
    hint: "Select multiple PDFs to combine",
    actionLabel: "Merge PDFs",
    defaultBaseName: (files) => (files[0]?.name.replace(/\.pdf$/i, "") ?? "merged") + "_merged",
  },
  toodle: {
    accept: "application/pdf",
    hint: "Upload a PDF to doodle on",
    actionLabel: "Save Toodle",
    defaultBaseName: (files) => (files[0]?.name.replace(/\.pdf$/i, "") ?? "document") + "_toodle",
  },
};

function ToodleEditor({ pdfUrl, accent, onSave, t }: { pdfUrl: string; accent: string; onSave: () => void; t: (k: string) => string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [color, setColor] = useState(accent);
  const [size, setSize] = useState(4);
  const [tool, setTool] = useState<"pen" | "highlight" | "eraser" | "text">("pen");
  const [textInputs, setTextInputs] = useState<{ id: number; x: number; y: number; value: string; committed: boolean }[]>([]);
  const [fontSize, setFontSize] = useState(16);

  function getPos(e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
      y: ((e as React.MouseEvent).clientY - rect.top) * scaleY,
    };
  }

  function handleCanvasClick(e: React.MouseEvent) {
    if (tool !== "text") return;
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTextInputs((prev) => [...prev, { id: Date.now(), x, y, value: "", committed: false }]);
  }

  function commitText(id: number, value: string) {
    if (!value.trim()) {
      setTextInputs((prev) => prev.filter((t) => t.id !== id));
      return;
    }
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const item = textInputs.find((t) => t.id === id);
    if (!item) return;
    ctx.globalCompositeOperation = "source-over";
    ctx.font = `${fontSize * scaleY}px 'Outfit', sans-serif`;
    ctx.fillStyle = color;
    ctx.fillText(value, item.x * scaleX, item.y * scaleY);
    setTextInputs((prev) => prev.filter((t) => t.id !== id));
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (tool === "text") return;
    const canvas = canvasRef.current; if (!canvas) return;
    drawing.current = true;
    const pos = getPos(e, canvas);
    lastPos.current = pos;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, (tool === "eraser" ? size * 3 : size) / 2, 0, Math.PI * 2);
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,1)";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = tool === "highlight" ? color + "55" : color;
    }
    ctx.fill();
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e, canvas);
    const prev = lastPos.current ?? pos;

    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineWidth = tool === "eraser" ? size * 6 : tool === "highlight" ? size * 5 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
    } else if (tool === "highlight") {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color + "55";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
    }
    ctx.stroke();
    lastPos.current = pos;
  }

  function stopDraw() {
    drawing.current = false;
    lastPos.current = null;
  }

  function clearCanvas() {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setTextInputs([]);
  }

  const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#22c55e", "#a855f7", "#ffffff"];

  const toolButtons: { id: "pen" | "highlight" | "text" | "eraser"; label: string; icon: React.ReactNode }[] = [
    {
      id: "pen", label: t("pen"),
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10 2l2 2L5 11l-3 1 1-3L10 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "highlight", label: t("highlight"),
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="4" width="10" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <path d="M5 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "text", label: t("text"),
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 3h10M7 3v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M4 11h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "eraser", label: t("erase"),
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L12 5l-6 7H3l-1-1 6-7" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M2 12h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const cursor = tool === "eraser" ? "cell" : tool === "text" ? "text" : "crosshair";

  return (
    <div className="flex flex-col gap-3">
      {/* PDF + drawing canvas overlay */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden"
        style={{ border: "1px solid #2a2a33", height: 320, background: "#1a1a1f" }}
      >
        <embed
          src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=0&view=Fit"}
          type="application/pdf"
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
        />
        <canvas
          ref={canvasRef}
          width={600}
          height={800}
          className="absolute inset-0 w-full h-full touch-none"
          style={{ cursor, background: "transparent" }}
          onClick={handleCanvasClick}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        {/* Floating text inputs */}
        {textInputs.map((ti) => (
          <div
            key={ti.id}
            className="absolute"
            style={{ left: ti.x, top: ti.y, transform: "translateY(-50%)" }}
          >
            <input
              autoFocus
              type="text"
              value={ti.value}
              onChange={(e) => setTextInputs((prev) => prev.map((t) => t.id === ti.id ? { ...t, value: e.target.value } : t))}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitText(ti.id, ti.value);
                if (e.key === "Escape") setTextInputs((prev) => prev.filter((t) => t.id !== ti.id));
              }}
              onBlur={() => commitText(ti.id, ti.value)}
              className="outline-none bg-transparent border-b"
              style={{
                color,
                fontSize,
                fontFamily: "'Outfit', sans-serif",
                borderColor: color + "88",
                minWidth: 60,
                caretColor: color,
                width: Math.max(60, ti.value.length * fontSize * 0.6 + 20),
              }}
            />
          </div>
        ))}
        {/* Page label */}
        <div className="absolute top-2 left-2 pointer-events-none">
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.65)", color: "#6e6c7e", fontFamily: "'Outfit', sans-serif" }}>
            {t("page")} 1
          </span>
        </div>
        {/* Text mode hint */}
        {tool === "text" && textInputs.length === 0 && (
          <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none">
            <span className="text-[10px] font-medium px-3 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.7)", color: "#a8a6b4", fontFamily: "'Outfit', sans-serif" }}>
              {t("clickToAddText")}
            </span>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div
        className="rounded-xl px-3 py-2.5 flex items-center gap-3 flex-wrap"
        style={{ background: "#1e1e25", border: "1px solid #2a2a33" }}
      >
        {/* Tool selector */}
        <div className="flex items-center gap-1 rounded-lg p-0.5" style={{ background: "#25252c" }}>
          {toolButtons.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTool(tb.id)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md text-[10px] font-semibold transition-all"
              style={{
                background: tool === tb.id ? accent : "transparent",
                color: tool === tb.id ? "#fff" : "#6e6c7e",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {tb.icon}
              <span className="hidden sm:inline">{tb.label}</span>
            </button>
          ))}
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => { setColor(c); if (tool === "eraser") setTool("pen"); }}
              className="rounded-full transition-all flex-shrink-0"
              style={{
                width: 16, height: 16,
                background: c,
                border: `2px solid ${color === c && tool !== "eraser" ? "#fff" : "transparent"}`,
                transform: color === c && tool !== "eraser" ? "scale(1.25)" : "scale(1)",
                outline: color === c && tool !== "eraser" ? `2px solid ${c}44` : "none",
                outlineOffset: 1,
              }}
            />
          ))}
        </div>

        {/* Size / font-size slider */}
        <div className="flex items-center gap-1.5 ml-auto">
          {tool === "text" ? (
            <>
              <span className="text-[9px]" style={{ color: "#6e6c7e", fontFamily: "'Outfit', sans-serif" }}>Aa</span>
              <input
                type="range" min={10} max={40} value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-14 h-1 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: accent }}
              />
              <span className="text-[9px] font-semibold" style={{ color: "#6e6c7e", fontFamily: "'Outfit', sans-serif" }}>{fontSize}px</span>
            </>
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="2" fill="#6e6c7e" />
              </svg>
              <input
                type="range" min={1} max={14} value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-14 h-1 rounded-full appearance-none cursor-pointer"
                style={{ accentColor: accent }}
              />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="4" fill="#6e6c7e" />
              </svg>
            </>
          )}
        </div>

        {/* Clear */}
        <button
          onClick={clearCanvas}
          className="text-[10px] font-semibold px-2 py-1 rounded-lg"
          style={{ background: "#ff444418", color: "#ff4444", fontFamily: "'Outfit', sans-serif" }}
        >
          {t("clear")}
        </button>
      </div>
    </div>
  );
}

function triggerDownload(filename: string) {
  const content = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\n%%EOF`;
  const blob = new Blob([content], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type RecentEntry = { name: string; op: string; size: string; date: string; toolId: string };

function ToolModal({ tool, onClose, onRecord, t }: { tool: typeof tools[0]; onClose: () => void; onRecord: (entry: RecentEntry) => void; t: (k: string) => string }) {
  type FileItem = { file: File; url: string; rotation: number; scale: number };

  const [items, setItems] = useState<FileItem[]>([]);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [outputFilename, setOutputFilename] = useState("");
  const [customName, setCustomName] = useState("");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => { items.forEach((it) => URL.revokeObjectURL(it.url)); };
  }, []);

  const meta = toolMeta[tool.id];
  const files = items.map((it) => it.file);

  function addFiles(incoming: File[]) {
    setItems((prev) => {
      if ((tool.id === "compress" || tool.id === "toodle") && prev.length >= 1) return prev;
      const toAdd = (tool.id === "compress" || tool.id === "toodle") ? incoming.slice(0, 1 - prev.length) : incoming;
      const newItems: FileItem[] = toAdd.map((f) => ({ file: f, url: URL.createObjectURL(f), rotation: 0, scale: 100 }));
      const next = [...prev, ...newItems];
      if (!customName) setCustomName(meta.defaultBaseName(next.map((it) => it.file)));
      if (next.length > 0) setSelectedIdx(0);
      return next;
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(Array.from(e.target.files!));
  }

  function removeItem(i: number) {
    URL.revokeObjectURL(items[i].url);
    setItems((prev) => prev.filter((_, idx) => idx !== i));
    setSelectedIdx(null);
  }

  function rotateItem(i: number) {
    setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, rotation: (it.rotation + 90) % 360 } : it));
  }

  function scaleItem(i: number, val: number) {
    setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, scale: val } : it));
  }

  function simulate() {
    if (!items.length) return;
    const base = (customName.trim() || meta.defaultBaseName(files)).replace(/\.pdf$/i, "");
    const name = `${base}.pdf`;
    setOutputFilename(name);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        setProgress(100);
        setDone(true);
        clearInterval(interval);
        triggerDownload(name);
        const opLabel: Record<string, string> = { "image-to-pdf": "Converted", compress: "Compressed", merge: "Merged", toodle: "Toodle" };
        const totalBytes = files.reduce((s, f) => s + f.size, 0);
        const sizeLabel = totalBytes >= 1024 * 1024
          ? `${(totalBytes / (1024 * 1024)).toFixed(1)} MB`
          : `${(totalBytes / 1024).toFixed(0)} KB`;
        const now = new Date();
        const dateLabel = `Today, ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        onRecord({ name, op: opLabel[tool.id] ?? tool.label, size: sizeLabel, date: dateLabel, toolId: tool.id });
      } else {
        setProgress(Math.round(p));
      }
    }, 180);
  }

  function reset() {
    items.forEach((it) => URL.revokeObjectURL(it.url));
    setItems([]);
    setProgress(null);
    setDone(false);
    setOutputFilename("");
    setCustomName("");
    setSelectedIdx(null);
  }

  const descriptions: Record<string, string> = {
    "image-to-pdf": t("descImgToPdf"),
    compress: t("descCompress"),
    merge: t("descMerge"),
    toodle: t("descToodle"),
  };

  const hint: Record<string, string> = {
    "image-to-pdf": t("hintImgToPdf"),
    compress: t("hintCompress"),
    merge: t("hintMerge"),
    toodle: t("hintToodle"),
  };

  const actionLabel: Record<string, string> = {
    "image-to-pdf": t("actionImgToPdf"),
    compress: t("actionCompress"),
    merge: t("actionMerge"),
    toodle: t("actionToodle"),
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-lg mx-auto rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{ background: "#16161c", border: "1px solid #2a2a33" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #2a2a33" }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg" style={{ background: tool.accent + "22" }}>
              <tool.icon color={tool.accent} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {t(`tool${tool.id === "image-to-pdf" ? "Img" : tool.id.charAt(0).toUpperCase() + tool.id.slice(1)}Label`)}
              </h2>
              <p className="text-xs" style={{ color: "#6e6c7e" }}>{descriptions[tool.id]}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg"
            style={{ background: "#1e1e25", color: "#6e6c7e" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {!done ? (
            <>
              {/* Drop zone — hidden for toodle once a file is loaded */}
              {!(tool.id === "toodle" && items.length > 0) && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer transition-all py-7"
                  style={{
                    border: `2px dashed ${dragging ? tool.accent : "#2a2a33"}`,
                    background: dragging ? tool.accent + "10" : "#1a1a1f",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    multiple={tool.id !== "compress" && tool.id !== "toodle"}
                    accept={meta.accept}
                    className="hidden"
                    onChange={handleChange}
                  />
                  <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: tool.accent + "18" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 13V4M6 7l4-4 4 4" stroke={tool.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M3 16h14" stroke={tool.accent} strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-white">{t("dropFiles")} <span style={{ color: tool.accent }}>{t("browse")}</span></p>
                  <p className="text-xs" style={{ color: "#6e6c7e" }}>{hint[tool.id]}</p>
                </div>
              )}

              {/* File previews with edit controls */}
              {items.length > 0 && tool.id !== "toodle" && (
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #2a2a33" }}>
                  {/* Thumbnail strip */}
                  <div
                    className="flex gap-2 p-2 overflow-x-auto"
                    style={{ background: "#1e1e25", borderBottom: selectedIdx !== null ? "1px solid #2a2a33" : "none" }}
                  >
                    {items.map((it, i) => {
                      const isImage = it.file.type.startsWith("image/");
                      const selected = selectedIdx === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedIdx(selected ? null : i)}
                          className="relative flex-shrink-0 rounded-lg overflow-hidden transition-all"
                          style={{
                            width: 56, height: 72,
                            border: `2px solid ${selected ? tool.accent : "#2a2a33"}`,
                            background: "#25252c",
                            transform: selected ? "scale(1.06)" : "scale(1)",
                            transition: "all 0.2s",
                          }}
                        >
                          {isImage ? (
                            <img
                              src={it.url}
                              alt={it.file.name}
                              className="w-full h-full object-cover"
                              style={{ transform: `rotate(${it.rotation}deg)`, transition: "transform 0.2s" }}
                            />
                          ) : (
                            <embed
                              src={it.url + "#toolbar=0&navpanes=0&scrollbar=0&view=Fit"}
                              type="application/pdf"
                              style={{ width: "100%", height: "100%", pointerEvents: "none", transform: `rotate(${it.rotation}deg)`, transition: "transform 0.2s" }}
                            />
                          )}
                          <span
                            className="absolute bottom-0.5 left-0 right-0 text-center text-[8px] font-bold"
                            style={{ color: selected ? tool.accent : "#6e6c7e", fontFamily: "'Outfit', sans-serif" }}
                          >
                            {i + 1}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Edit panel for selected file */}
                  {selectedIdx !== null && items[selectedIdx] && (() => {
                    const it = items[selectedIdx];
                    const isImage = it.file.type.startsWith("image/");
                    return (
                      <div className="p-3 space-y-3" style={{ background: "#1a1a1f" }}>
                        {/* Large preview */}
                        <div
                          className="rounded-xl overflow-hidden relative"
                          style={{ background: "#25252c", height: 200 }}
                        >
                          {isImage ? (
                            <img
                              src={it.url}
                              alt={it.file.name}
                              className="w-full h-full object-contain"
                              style={{ transform: `rotate(${it.rotation}deg)`, transition: "transform 0.25s" }}
                            />
                          ) : (
                            <embed
                              src={it.url + "#toolbar=0&navpanes=0&scrollbar=0&view=Fit"}
                              type="application/pdf"
                              style={{ width: "100%", height: "100%", pointerEvents: "none", transform: `rotate(${it.rotation}deg)`, transition: "transform 0.25s" }}
                            />
                          )}
                          {/* File label badge */}
                          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center pointer-events-none">
                            <span className="text-[10px] px-2 py-0.5 rounded-full truncate max-w-[70%]" style={{ background: "rgba(0,0,0,0.65)", color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
                              {it.file.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,0.65)", color: "#6e6c7e", fontFamily: "'Outfit', sans-serif" }}>
                              {(it.file.size / 1024).toFixed(0)} KB
                            </span>
                          </div>
                        </div>

                        {/* Controls — rotate + delete for edit, rotate only for image-to-pdf */}
                        {(tool.id === "image-to-pdf" || tool.id === "toodle") && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => rotateItem(selectedIdx)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-1 justify-center transition-all"
                              style={{ background: tool.accent + "18", color: tool.accent, fontFamily: "'Outfit', sans-serif" }}
                            >
                              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path d="M11 6.5A4.5 4.5 0 1 1 6.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                <path d="M6.5 2L9 4.5M6.5 2L9 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Rotate {it.rotation}°
                            </button>
                            {tool.id === "toodle" && (
                              <button
                                onClick={() => removeItem(selectedIdx)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold flex-1 justify-center transition-all"
                                style={{ background: "#ff444418", color: "#ff4444", fontFamily: "'Outfit', sans-serif" }}
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 3h8M4 3V2h4v1M5 5v4M7 5v4M3 3l.5 7h5l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Delete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Toodle: loaded file bar + editor */}
              {tool.id === "toodle" && items.length > 0 && (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#1e1e25", border: "1px solid #2a2a33" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tool.accent + "22" }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="1" y="1" width="9" height="12" rx="1.5" stroke={tool.accent} strokeWidth="1.2" />
                        <path d="M3 4h5M3 7h3" stroke={tool.accent} strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="flex-1 text-sm font-medium text-white truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {items[0].file.name}
                    </span>
                    <span className="text-xs flex-shrink-0" style={{ color: "#6e6c7e", fontFamily: "'Outfit', sans-serif" }}>
                      {(items[0].file.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      onClick={() => {
                        items.forEach((it) => URL.revokeObjectURL(it.url));
                        setItems([]);
                        setCustomName("");
                      }}
                      className="text-[10px] font-semibold px-2 py-1 rounded-lg flex-shrink-0 transition-all"
                      style={{ background: tool.accent + "18", color: tool.accent, fontFamily: "'Outfit', sans-serif" }}
                    >
                      {t("replace")}
                    </button>
                  </div>
                  <ToodleEditor pdfUrl={items[0].url} accent={tool.accent} onSave={simulate} t={t} />
                </>
              )}

              {/* Output filename input */}
              {items.length > 0 && (
                <div className="rounded-xl px-3 py-2.5 flex items-center gap-2" style={{ background: "#1a1a1f", border: "1px solid #2a2a33" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                    <rect x="1" y="1" width="9" height="12" rx="1.5" stroke={tool.accent} strokeWidth="1.2" />
                    <path d="M3 4h5M3 7h3" stroke={tool.accent} strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={meta.defaultBaseName(files)}
                    className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-[#6e6c7e]"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
              )}

              {/* Progress */}
              {progress !== null && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs" style={{ color: "#6e6c7e" }}>
                    <span>{t("processing")}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#2a2a33" }}>
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{ width: `${progress}%`, background: tool.accent }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={simulate}
                disabled={!items.length || progress !== null}
                className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  background: items.length && progress === null ? tool.accent : "#2a2a33",
                  color: "#fff",
                }}
              >
                {actionLabel[tool.id]}
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: tool.accent + "22" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="12" stroke={tool.accent} strokeWidth="1.8" />
                  <path d="M8 14l4 4 8-8" stroke={tool.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-white font-semibold" style={{ fontFamily: "'Outfit', sans-serif" }}>{t("downloadStarted")}</p>
                <p className="text-xs mt-1" style={{ color: "#6e6c7e" }}>{outputFilename}</p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => triggerDownload(outputFilename)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ fontFamily: "'Outfit', sans-serif", background: tool.accent, color: "#fff" }}
                >
                  {t("downloadAgain")}
                </button>
                <button
                  onClick={reset}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ fontFamily: "'Outfit', sans-serif", background: "#1e1e25", color: "#a8a6b4" }}
                >
                  {t("newFile")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RefreshOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1100);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <>
      {/* Subtle full-screen flash */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "#0f0f11",
          animation: "refreshOverlayIn 0.05s ease forwards, refreshOverlayOut 0.35s ease 0.15s forwards",
          pointerEvents: "none",
        }}
      />
      {/* Centre icon spin */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          animation: "refreshOverlayOut 0.3s ease 0.5s forwards",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "#ff5c1a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "refreshIconSpin 0.65s cubic-bezier(0.4,0,0.2,1) 0.05s 1",
          }}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect x="3" y="2" width="14" height="18" rx="2.5" fill="white" fillOpacity="0.92" />
            <path d="M17 6h5M17 11h4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M6 8h8M6 12h5M6 16h4" stroke="#ff5c1a" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </>
  );
}

function playSplashSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();

    function playTone(freq: number, startTime: number, duration: number, gainPeak: number, type: OscillatorType = "sine") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(gainPeak, ctx.currentTime + startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration);
    }

    // Ascending chime: C5 → E5 → G5 → C6
    playTone(523.25, 0.0,  0.55, 0.18);
    playTone(659.25, 0.18, 0.55, 0.16);
    playTone(783.99, 0.34, 0.55, 0.15);
    playTone(1046.5, 0.50, 0.90, 0.20);

    // Soft shimmer layer on the final note
    playTone(1046.5, 0.50, 0.80, 0.06, "triangle");
    playTone(2093.0, 0.52, 0.70, 0.03, "sine");

    setTimeout(() => ctx.close(), 2000);
  } catch {}
}

function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    playSplashSound();
    const timer = setTimeout(onDone, 2300);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0f0f11",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        animation: "splashFadeOut 0.45s ease 1.85s forwards",
      }}
    >
      {/* Logo icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          background: "#ff5c1a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "splashPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.2s both, splashPulse 1.2s ease 0.75s 1",
        }}
      >
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <rect x="5" y="4" width="22" height="28" rx="3.5" fill="white" fillOpacity="0.92" />
          <path d="M27 10h8M27 17h6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M10 13h12M10 19h8M10 25h6" stroke="#ff5c1a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Wordmark */}
      <div
        style={{
          marginTop: 24,
          animation: "splashFadeUp 0.5s ease 0.75s both",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 32,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.5px",
        }}
      >
        DeskKit
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 8,
          animation: "splashFadeIn 0.5s ease 1.1s both",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          color: "#6e6c7e",
          letterSpacing: "0.04em",
        }}
      >
        Your PDF toolkit
      </div>

      {/* Loading dots */}
      <div
        style={{
          marginTop: 48,
          display: "flex",
          gap: 6,
          animation: "splashFadeIn 0.4s ease 1.2s both",
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#ff5c1a",
              opacity: 0.7,
              animation: `splashFadeIn 0.3s ease ${1.3 + i * 0.15}s both`,
            }}
          />
        ))}
      </div>

      {/* By credit */}
      <div
        style={{
          position: "absolute",
          bottom: 36,
          fontFamily: "'Outfit', sans-serif",
          fontSize: 11,
          fontWeight: 500,
          color: "#3a3a44",
          letterSpacing: "0.08em",
          animation: "splashFadeIn 0.4s ease 1.3s both",
        }}
      >
        by Rohan
      </div>
    </div>
  );
}

function ShareSheet({ item, onClose, darkMode }: { item: RecentEntry; onClose: () => void; darkMode: boolean }) {
  const surface = darkMode ? "#1a1a1f" : "#ffffff";
  const surface2 = darkMode ? "#1e1e25" : "#f0f0f3";
  const border = darkMode ? "#2a2a33" : "#e2e2e8";
  const textPrimary = darkMode ? "#ffffff" : "#0f0f11";
  const textMuted = darkMode ? "#6e6c7e" : "#8e8c9e";

  const [copied, setCopied] = useState(false);

  const shareText = `${item.op}: ${item.name} — processed with DeskKit`;
  const encodedText = encodeURIComponent(shareText);
  const encodedName = encodeURIComponent(item.name);

  const apps = [
    {
      name: "WhatsApp",
      color: "#25D366",
      bg: "#25D36618",
      href: `https://wa.me/?text=${encodedText}`,
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="12" fill="#25D366" />
          <path d="M18.5 15.8c-.3-.15-1.7-.84-1.97-.94-.26-.1-.46-.15-.65.15-.2.3-.75.94-.92 1.13-.17.2-.34.22-.63.07-.3-.14-1.24-.46-2.37-1.47-.87-.78-1.46-1.75-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.5.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.14-.65-1.57-.9-2.15-.23-.56-.47-.48-.65-.49-.17 0-.36-.02-.56-.02s-.5.07-.77.37c-.26.3-1 1-.1 2.42.9 1.43 3.14 4.6 6.9 4.6 1.03 0 2-.63 2.28-1.37.27-.73.27-1.36.19-1.5-.08-.13-.28-.2-.58-.35z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      color: "#229ED9",
      bg: "#229ED918",
      href: `https://t.me/share/url?url=${encodeURIComponent("https://deskkit.app")}&text=${encodedText}`,
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="12" fill="#229ED9" />
          <path d="M6 12.8l10.5-4.05c.5-.18.93.12.77.88l-1.8 8.45c-.13.6-.5.75-.99.47l-2.75-2.03-1.33 1.28c-.15.14-.27.26-.55.26l.2-2.83 5.1-4.6c.22-.2-.05-.3-.34-.11L8.7 14.9 6.05 14c-.6-.18-.6-.6 0-.83-.01-.01-.04.03-.05-.2z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      color: "#E1306C",
      bg: "#E1306C18",
      href: null,
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect width="26" height="26" rx="13" fill="url(#ig)" />
          <defs>
            <linearGradient id="ig" x1="0" y1="26" x2="26" y2="0">
              <stop offset="0%" stopColor="#F58529" />
              <stop offset="50%" stopColor="#DD2A7B" />
              <stop offset="100%" stopColor="#8134AF" />
            </linearGradient>
          </defs>
          <rect x="7" y="7" width="12" height="12" rx="3.5" stroke="white" strokeWidth="1.5" />
          <circle cx="13" cy="13" r="3" stroke="white" strokeWidth="1.4" />
          <circle cx="17" cy="9" r="0.9" fill="white" />
        </svg>
      ),
    },
    {
      name: "X / Twitter",
      color: "#000000",
      bg: "#00000018",
      href: `https://twitter.com/intent/tweet?text=${encodedText}`,
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="12" fill={darkMode ? "#fff" : "#000"} />
          <path d="M7 7.5h4.2l3.5 5 4.3-5H20l-5.2 6 5.7 7h-4.2l-3.9-5.2-4.7 5.2H6.5l5.5-6.3L7 7.5z" fill={darkMode ? "#000" : "#fff"} />
        </svg>
      ),
    },
    {
      name: "Facebook",
      color: "#1877F2",
      bg: "#1877F218",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://deskkit.app")}&quote=${encodedText}`,
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="12" fill="#1877F2" />
          <path d="M14.5 13.5H16l.5-2h-2V10c0-.55.27-1 1.1-1H16.6V7.2A16.5 16.5 0 0 0 14.8 7C12.9 7 11.5 8.3 11.5 10.2V11.5H9.5v2h2V20h3v-6.5z" fill="white" />
        </svg>
      ),
    },
    {
      name: "Email",
      color: "#ff5c1a",
      bg: "#ff5c1a18",
      href: `mailto:?subject=${encodedName}&body=${encodedText}`,
      icon: (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="12" fill="#ff5c1a" />
          <rect x="6" y="9" width="14" height="9" rx="2" stroke="white" strokeWidth="1.4" />
          <path d="M6 10l7 5 7-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  function handleAppShare(href: string | null, name: string) {
    if (name === "Instagram") {
      if (navigator.share) {
        navigator.share({ title: item.name, text: shareText }).catch(() => {});
      } else {
        navigator.clipboard?.writeText(shareText).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => {});
      }
    } else if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    onClose();
  }

  function handleNativeShare() {
    if (navigator.share) {
      navigator.share({ title: item.name, text: shareText }).catch(() => {});
      onClose();
    }
  }

  function handleCopy() {
    navigator.clipboard?.writeText(shareText).then(() => { setCopied(true); setTimeout(() => { setCopied(false); onClose(); }, 1500); }).catch(() => {});
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-t-3xl pb-8"
        style={{ background: surface, borderTop: `1px solid ${border}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ background: border }} />
        </div>

        {/* Header */}
        <div className="px-5 pb-4" style={{ borderBottom: `1px solid ${border}` }}>
          <p className="text-base font-bold" style={{ color: textPrimary, fontFamily: "'Outfit', sans-serif" }}>Share File</p>
          <p className="text-xs mt-0.5 truncate" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{item.name}</p>
        </div>

        {/* App grid */}
        <div className="grid grid-cols-4 gap-4 px-5 pt-5 pb-4">
          {apps.map((app) => (
            <button
              key={app.name}
              onClick={() => handleAppShare(app.href, app.name)}
              className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden" style={{ background: app.bg }}>
                {app.icon}
              </div>
              <span className="text-[10px] font-medium text-center leading-tight" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{app.name}</span>
            </button>
          ))}
          {/* More (native share) */}
          {typeof navigator.share === "function" && (
            <button
              onClick={handleNativeShare}
              className="flex flex-col items-center gap-2 active:scale-90 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: surface2 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="6" cy="11" r="1.5" fill={textMuted} />
                  <circle cx="11" cy="11" r="1.5" fill={textMuted} />
                  <circle cx="16" cy="11" r="1.5" fill={textMuted} />
                </svg>
              </div>
              <span className="text-[10px] font-medium" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>More</span>
            </button>
          )}
        </div>

        {/* Copy link */}
        <div className="px-5 pt-1">
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all active:scale-98"
            style={{ background: surface2, border: `1px solid ${border}` }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: copied ? "#22c55e22" : "#ff5c1a18" }}>
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l3.5 3.5 6.5-7" stroke="#22c55e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="#ff5c1a" strokeWidth="1.3" />
                  <path d="M5 4V3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1" stroke="#ff5c1a" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M3 6v7a1 1 0 0 0 1 1h1" stroke="#ff5c1a" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold" style={{ color: copied ? "#22c55e" : textPrimary, fontFamily: "'Outfit', sans-serif" }}>
                {copied ? "Copied!" : "Copy file info"}
              </p>
              <p className="text-xs truncate" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{shareText}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

const accentMap: Record<string, string> = {
  compress: "#3b82f6",
  merge: "#22c55e",
  "image-to-pdf": "#ff5c1a",
  toodle: "#f59e0b",
};

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "pt", label: "Portuguese", native: "Português" },
];

export default function App() {
  const navType = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type;
  const isReload = navType === "reload";
  const [showSplash, setShowSplash] = useState(!isReload);
  const [showRefresh, setShowRefresh] = useState(isReload);
  const handleSplashDone = useCallback(() => setShowSplash(false), []);
  const handleRefreshDone = useCallback(() => setShowRefresh(false), []);
  const [active, setActive] = useState<Tool>(null);
  const [recent, setRecent] = useState<RecentEntry[]>(() => {
    try {
      const saved = localStorage.getItem("deskkit_recent");
      return saved ? (JSON.parse(saved) as RecentEntry[]) : [];
    } catch {
      return [];
    }
  });
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState<"home" | "settings" | "all-files">("home");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("deskkit_darkMode");
    return saved === null ? true : saved === "true";
  });
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem("deskkit_language") ?? "en";
  });
  const [langOpen, setLangOpen] = useState(false);
  const [sharingItem, setSharingItem] = useState<RecentEntry | null>(null);

  const activeTool = tools.find((t) => t.id === active);

  function handleRecord(entry: RecentEntry) {
    setRecent((prev) => {
      const next = [entry, ...prev].slice(0, 50);
      try { localStorage.setItem("deskkit_recent", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function deleteRecent(idx: number) {
    setRecent((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      try { localStorage.setItem("deskkit_recent", JSON.stringify(next)); } catch {}
      return next;
    });
  }

  function shareRecent(item: RecentEntry) {
    setSharingItem(item);
  }

  const visibleRecent = showAll ? recent : recent.slice(0, 4);

  function t(key: string): string {
    return (TRANSLATIONS[language] ?? TRANSLATIONS.en)[key] ?? (TRANSLATIONS.en[key] ?? key);
  }

  const bg = darkMode ? "#0f0f11" : "#f4f4f6";
  const surface = darkMode ? "#1a1a1f" : "#ffffff";
  const surface2 = darkMode ? "#1e1e25" : "#f0f0f3";
  const border = darkMode ? "#2a2a33" : "#e2e2e8";
  const textPrimary = darkMode ? "#ffffff" : "#0f0f11";
  const textMuted = darkMode ? "#6e6c7e" : "#8e8c9e";

  return (
    <>
    {showSplash && <SplashScreen onDone={handleSplashDone} />}
    {showRefresh && <RefreshOverlay onDone={handleRefreshDone} />}
    <div className="min-h-screen flex flex-col" style={{ background: bg }}>

      {/* Header */}
      <header className="px-6 pt-6 pb-4">
        {page !== "all-files" && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#ff5c1a" }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1" y="1" width="8" height="10" rx="1" fill="white" fillOpacity="0.9" />
                <path d="M9 4h2.5M9 7h2" stroke="white" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#ff5c1a", fontFamily: "'Outfit', sans-serif" }}>
              DeskKit
            </span>
          </div>
        )}
        {page === "all-files" && (
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-1.5 mb-2 ml-2"
            style={{ color: "#ff5c1a", fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>
        )}
        <h1 className="text-3xl font-bold leading-tight" style={{ fontFamily: "'Outfit', sans-serif", color: textPrimary }}>
          {page === "home" ? " " : page === "all-files" ? "All Files" : t("settings")}
        </h1>
        <p className="text-sm mt-1" style={{ color: textMuted }}>
          {page === "home" ? " " : page === "all-files" ? `${recent.length} file${recent.length !== 1 ? "s" : ""} processed` : t("prefsInfo")}
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 pb-24 space-y-6">

        {page === "all-files" ? (
          <section>
            {recent.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center gap-3 rounded-2xl py-16"
                style={{ background: surface, border: `1px solid ${border}` }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#ff5c1a14" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="2" width="14" height="18" rx="2.5" stroke="#ff5c1a" strokeWidth="1.6" strokeOpacity="0.6" />
                    <path d="M7 7h6M7 11h4M7 15h3" stroke="#ff5c1a" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
                  </svg>
                </div>
                <p className="text-sm font-semibold" style={{ color: textPrimary, fontFamily: "'Outfit', sans-serif" }}>No files yet</p>
                <p className="text-xs" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>Processed files will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((item, i) => {
                  const color = accentMap[item.toolId] ?? "#ff5c1a";
                  return (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden"
                      style={{ background: surface, border: `1px solid ${border}` }}
                    >
                      {/* File info row */}
                      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "18" }}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x="2" y="1" width="13" height="18" rx="2.5" stroke={color} strokeWidth="1.5" />
                            <path d="M5 7h7M5 10.5h5M5 14h4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ fontFamily: "'Outfit', sans-serif", color: textPrimary }}>{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: color + "22", color }}>{item.op}</span>
                            <span className="text-xs" style={{ color: textMuted }}>{item.size}</span>
                            <span className="text-xs" style={{ color: textMuted }}>·</span>
                            <span className="text-xs" style={{ color: textMuted }}>{item.date}</span>
                          </div>
                        </div>
                      </div>
                      {/* Action buttons */}
                      <div className="flex" style={{ borderTop: `1px solid ${border}` }}>
                        <button
                          onClick={() => shareRecent(item)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all active:opacity-70"
                          style={{ color: "#3b82f6", fontFamily: "'Outfit', sans-serif", borderRight: `1px solid ${border}` }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <circle cx="11" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                            <circle cx="11" cy="11.5" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                            <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2" />
                            <path d="M4.4 6.2l5.2-3M4.4 7.8l5.2 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                          Share
                        </button>
                        <button
                          onClick={() => deleteRecent(i)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all active:opacity-70"
                          style={{ color: "#ef4444", fontFamily: "'Outfit', sans-serif" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 3.5h10M5 3.5V2.5h4v1M4 3.5l.6 8h4.8l.6-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6v3.5M8 6v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ) : page === "home" ? (
          <>
            {/* Tools grid */}
            <section>
              <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>
                {t("tools")}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActive(tool.id)}
                    className="group text-left rounded-2xl p-4 transition-all active:scale-95"
                    style={{ background: surface, border: `1px solid ${border}` }}
                  >
                    <div className="mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tool.accent + "18" }}>
                        <tool.icon color={tool.accent} />
                      </div>
                    </div>
                    <p className="font-semibold text-sm mb-1" style={{ fontFamily: "'Outfit', sans-serif", color: textPrimary }}>
                      {t(`tool${tool.id === "image-to-pdf" ? "Img" : tool.id.charAt(0).toUpperCase() + tool.id.slice(1)}Label`)}
                    </p>
                    <div className="mt-2 flex items-center gap-1" style={{ color: tool.accent }}>
                      <span className="text-xs font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>{t("open")}</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5h6M6 3l2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Recent activity — always visible */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium tracking-widest uppercase" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>
                  {t("recent")}
                </p>
                {recent.length > 0 && (
                  <button onClick={() => setPage("all-files")} className="text-xs font-medium" style={{ color: "#ff5c1a", fontFamily: "'Outfit', sans-serif" }}>
                    {t("seeAll")}
                  </button>
                )}
              </div>

              {recent.length === 0 ? (
                /* Empty state */
                <div
                  className="flex flex-col items-center justify-center gap-3 rounded-2xl py-10"
                  style={{ background: surface, border: `1px solid ${border}` }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#ff5c1a14" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="2" width="14" height="18" rx="2.5" stroke="#ff5c1a" strokeWidth="1.6" strokeOpacity="0.6" />
                      <path d="M7 7h6M7 11h4M7 15h3" stroke="#ff5c1a" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
                      <circle cx="18" cy="18" r="5" fill="#ff5c1a" fillOpacity="0.12" stroke="#ff5c1a" strokeWidth="1.4" strokeOpacity="0.5" />
                      <path d="M16 18h4M18 16v4" stroke="#ff5c1a" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6" />
                    </svg>
                  </div>
                  <div className="text-center px-6">
                    <p className="text-sm font-semibold" style={{ color: textPrimary, fontFamily: "'Outfit', sans-serif" }}>No files yet</p>
                    <p className="text-xs mt-1" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>Use any tool above — your processed files will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {visibleRecent.map((item, i) => {
                    const color = accentMap[item.toolId] ?? "#ff5c1a";
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: surface, border: `1px solid ${border}` }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color + "18" }}>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="2" y="1" width="12" height="16" rx="2" stroke={color} strokeWidth="1.4" />
                            <path d="M5 6h6M5 9h4M5 12h3" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate" style={{ fontFamily: "'Outfit', sans-serif", color: textPrimary }}>{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: color + "22", color }}>{item.op}</span>
                            <span className="text-xs" style={{ color: textMuted }}>{item.size}</span>
                          </div>
                        </div>
                        <p className="text-xs flex-shrink-0" style={{ color: textMuted }}>{item.date}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="space-y-6">

            {/* Appearance */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{t("appearance")}</p>
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
                <div className="flex items-center justify-between px-4 py-4" style={{ background: surface }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#a855f718" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="#a855f7" strokeWidth="1.3" strokeLinecap="round" />
                        <circle cx="8" cy="8" r="2.5" stroke="#a855f7" strokeWidth="1.3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: textPrimary, fontFamily: "'Outfit', sans-serif" }}>{t("darkMode")}</p>
                      <p className="text-xs" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{darkMode ? t("darkOn") : t("darkOff")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode((v) => { localStorage.setItem("deskkit_darkMode", String(!v)); return !v; })}
                    className="relative flex-shrink-0"
                    style={{ width: 44, height: 24, borderRadius: 12, background: darkMode ? "#a855f7" : border, transition: "background 0.2s" }}
                  >
                    <span
                      className="absolute top-1"
                      style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", left: darkMode ? 24 : 4, transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Language */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{t("language")}</p>
              <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-4"
                  style={{ background: surface }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#3b82f618" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="#3b82f6" strokeWidth="1.3" />
                        <path d="M8 1.5C8 1.5 5.5 4 5.5 8s2.5 6.5 2.5 6.5M8 1.5C8 1.5 10.5 4 10.5 8S8 14.5 8 14.5M1.5 8h13" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold" style={{ color: textPrimary, fontFamily: "'Outfit', sans-serif" }}>{t("language")}</p>
                      <p className="text-xs" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>
                        {LANGUAGES.find((l) => l.code === language)?.native} — {LANGUAGES.find((l) => l.code === language)?.label}
                      </p>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: textMuted }}>
                    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {langOpen && (
                  <div style={{ borderTop: `1px solid ${border}` }}>
                    {LANGUAGES.map((lang, idx) => (
                      <button
                        key={lang.code}
                        onClick={() => { localStorage.setItem("deskkit_language", lang.code); setLanguage(lang.code); setLangOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-3 transition-all"
                        style={{
                          background: language === lang.code ? "#3b82f611" : surface,
                          borderTop: idx > 0 ? `1px solid ${border}` : "none",
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium" style={{ color: textPrimary, fontFamily: "'Outfit', sans-serif" }}>{lang.native}</span>
                          <span className="text-xs" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{lang.label}</span>
                        </div>
                        {language === lang.code && (
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7l4 4 6-6" stroke="#3b82f6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* About */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{t("about")}</p>
              <div className="rounded-2xl px-4 py-5 flex items-center gap-4" style={{ background: surface, border: `1px solid ${border}` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: "#ff5c1a" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="2" y="2" width="13" height="17" rx="2" fill="white" fillOpacity="0.9" />
                    <path d="M15 6h4M15 10h3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-bold" style={{ color: textPrimary, fontFamily: "'Outfit', sans-serif" }}>DeskKit</p>
                  <p className="text-xs mt-0.5" style={{ color: textMuted, fontFamily: "'Outfit', sans-serif" }}>{t("version")}</p>
                  <p className="text-xs mt-1 font-semibold" style={{ color: "#ff5c1a", fontFamily: "'Outfit', sans-serif" }}>{t("madeBy")}</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex items-center justify-around px-4 pb-6 pt-3"
        style={{ background: darkMode ? "linear-gradient(to top, #0f0f11 80%, transparent)" : `linear-gradient(to top, ${bg} 80%, transparent)`, backdropFilter: "blur(12px)" }}
      >
        {(["home", "settings"] as const).map((id) => {
          const isActive = page === id || (id === "home" && page === "all-files");
          const label = id === "home" ? t("home") : t("settings");
          const icon = id === "home" ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 9l7-6 7 6v9H13v-5H7v5H3V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          );
          return (
            <button key={id} onClick={() => setPage(id)} className="flex flex-col items-center gap-1" style={{ color: isActive ? "#ff5c1a" : textMuted }}>
              {icon}
              <span className="text-[10px] font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modal */}
      {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActive(null)} onRecord={handleRecord} t={t} />
      )}
      {sharingItem && (
        <ShareSheet item={sharingItem} onClose={() => setSharingItem(null)} darkMode={darkMode} />
      )}
    </div>
    </>
  );
}
