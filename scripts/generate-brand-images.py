#!/usr/bin/env python3
"""
Amber HP ブランドビジュアル生成（gpt-image-1）

OPENAI_API_KEY を環境変数から読み込み、5枚のブランド画像を
public/images/brand/ 配下に出力する。

実行:
    python3 scripts/generate-brand-images.py

依存:
    pip install openai
"""

from __future__ import annotations

import base64
import os
import sys
from pathlib import Path

try:
    from openai import OpenAI
except ImportError:
    print("⚠ openai ライブラリが未インストール。以下を実行してください:")
    print("    pip3 install openai")
    sys.exit(1)


ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = ROOT / "public" / "images" / "brand"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# 共通スタイル指示（全画像で適用）
STYLE_BASE = (
    "Bright, airy, photorealistic editorial photography. "
    "Generous natural daylight, luminous and fresh. "
    "Light, clean palette: soft creams, warm whites, light wood tones, "
    "with clear forest green (#0F2A1E) accents as a refined highlight. "
    "Dignified yet welcoming atmosphere — intellectual and inviting. "
    "Magazine-quality lifestyle product photography. "
    "STRICT NO: no people, no hands, no faces, no robots, no circuit boards, "
    "no glowing data grids, no holograms, no neon, no obvious AI iconography, "
    "no stock-photo cliches, no text, no logos, no watermarks, "
    "no dark moody atmosphere."
)


IMAGES: list[dict[str, str]] = [
    {
        "filename": "consulting-hero.png",
        "size": "1536x1024",
        "prompt": (
            "Editorial photograph of a tablet device on a wooden workbench "
            "in an industrial workspace setting. The tablet shows an abstract "
            "minimalist interface (clean shapes only, no text). "
            "Around the tablet: a leather-bound notebook, a brass pen, "
            "and a small industrial tool or measurement instrument. "
            "Behind, the soft-focused environment of a workshop or warehouse — "
            "racks, beams, bright natural light streaming through tall clean windows. "
            "NO PEOPLE. Object photography only. "
            "Light cream, warm wood, and fresh forest green palette, bright airy composition. "
            f"{STYLE_BASE}"
        ),
    },
    {
        "filename": "training-hero.png",
        "size": "1536x1024",
        "prompt": (
            "Wide editorial photograph of an empty modern Japanese training room "
            "right after a session: a clean wooden table with two open laptops "
            "(screens dim or off), several leather notebooks, brass pens, "
            "a few colorful sticky notes, two cups of coffee. "
            "In the background, a whiteboard with abstract handwritten diagrams "
            "(illegible, just suggestive shapes). "
            "Bright window light, abundant natural daylight from the side. "
            "Light cream and warm white tones with fresh forest green accents in the surroundings. "
            "NO PEOPLE. The space breathes quiet productive aftermath. "
            f"{STYLE_BASE}"
        ),
    },
    {
        "filename": "consulting-split.png",
        "size": "1024x1024",
        "prompt": (
            "Editorial wide-angle photograph of a working industrial site, "
            "completely unpeopled: a logistics dock, a manufacturing floor, "
            "or a maintenance workshop. The composition emphasizes "
            "the structured beauty of industrial work: stacked shelving, "
            "neat rows of materials, bright clean directional light. "
            "NO PEOPLE. The atmosphere is reverent toward the work that happens here. "
            "Bright, well-lit industrial space with clean palette and subtle forest green tones, "
            "shallow depth, bright and clean. "
            f"{STYLE_BASE}"
        ),
    },
    {
        "filename": "training-split.png",
        "size": "1024x1024",
        "prompt": (
            "Close-up still life photograph of a sleek laptop, slightly open, "
            "showing an abstract minimalist workflow diagram on screen "
            "(no specific UI, just elegant geometric shapes, no text). "
            "Beside the laptop: a leather-bound notebook with handwritten diagrams, "
            "a brass pen, a ceramic coffee cup, "
            "and a small living plant in soft focus. "
            "Bright golden afternoon sunlight. "
            "NO PEOPLE, NO HANDS. Pure object photography. "
            "Light cream, warm white, and fresh forest green accent palette. "
            f"{STYLE_BASE}"
        ),
    },
    {
        "filename": "about-teaser.png",
        "size": "1024x1536",
        "prompt": (
            "Vertical editorial still life photograph: an arrangement of crafted tools "
            "and natural materials suggesting essential service work — "
            "could include weathered work tools (a metal trowel, leather gloves, "
            "wooden brushes), folded heavy fabric, raw materials like rope or wood, "
            "carefully composed on a textured surface. "
            "NO PEOPLE, NO HANDS. Object photography in the spirit of "
            "Japanese craftsmanship documentation. "
            "Bright clean daylight, light cream and warm wood tones with subtle forest green accents. "
            "Strong sense of human craftsmanship through the objects themselves. "
            f"{STYLE_BASE}"
        ),
    },
    # === Split型用：2サービス（consulting） ===
    {
        "filename": "service-system-dev.png",
        "size": "1024x1024",
        "prompt": (
            "Editorial still life photograph: a sleek laptop displaying "
            "an abstract clean interface design (geometric shapes only, no text), "
            "alongside a handwritten leather notebook with system diagrams, "
            "a brass pen, and a small industrial artifact "
            "(perhaps a hard hat tag, wrench, or measurement tool). "
            "Bright window light, abundant natural daylight. "
            "NO PEOPLE, NO HANDS. Pure object photography. "
            "Light cream, warm white, with fresh forest green accents. "
            "The composition bridges digital craftsmanship and field reality. "
            f"{STYLE_BASE}"
        ),
    },
    {
        "filename": "service-agent.png",
        "size": "1024x1024",
        "prompt": (
            "Editorial photograph of multiple sleek monitors arranged on a clean desk, "
            "each displaying abstract autonomous workflow visualizations "
            "(elegant flow diagrams, subtle geometric data movement, no text). "
            "Bright clean room with abundant natural light. "
            "NO PEOPLE, NO HANDS. The workspace appears to operate quietly on its own. "
            "Light cream and warm white tones with fresh forest green accents. "
            "Sense of quiet operational autonomy and competence. "
            f"{STYLE_BASE}"
        ),
    },
    # === Split型用：2コース（ai-training） ===
    {
        "filename": "course-basic.png",
        "size": "1024x1024",
        "prompt": (
            "Editorial photograph of a Japanese training room mid-session "
            "but without any people present: a wooden table with two open laptops, "
            "leather notebooks with handwritten notes, brass pens placed mid-thought, "
            "post-it notes, two coffee cups. "
            "A whiteboard in the background covered with abstract handwritten "
            "diagrams and arrows (illegible). "
            "Bright sunlit window from the side. "
            "NO PEOPLE. The space feels alive with recent intellectual activity. "
            "Light cream and warm white tones with fresh forest green accents. "
            f"{STYLE_BASE}"
        ),
    },
    {
        "filename": "course-advanced.png",
        "size": "1024x1024",
        "prompt": (
            "Editorial still life photograph of an experienced professional's workspace: "
            "a modern laptop displaying an abstract sophisticated dashboard "
            "(elegant minimal visual elements, no text), "
            "a leather notebook with diagrams, a ceramic coffee cup, "
            "a fountain pen, all arranged with quiet care. "
            "Bright golden afternoon light pouring through wide windows. "
            "NO PEOPLE, NO HANDS. Pure object photography. "
            "Light cream and warm white palette with fresh forest green accents. "
            "The image conveys mastery and the moment after building "
            "something that runs reliably on its own. "
            f"{STYLE_BASE}"
        ),
    },
]


def main() -> int:
    if not os.environ.get("OPENAI_API_KEY"):
        print("⚠ OPENAI_API_KEY 環境変数が設定されていません。")
        print("    ~/.zshenv に export OPENAI_API_KEY=... を追加してください。")
        return 1

    client = OpenAI()

    total = len(IMAGES)
    skip_existing = "--force" not in sys.argv
    for idx, img in enumerate(IMAGES, 1):
        out_path = OUTPUT_DIR / img["filename"]

        if skip_existing and out_path.exists():
            print(f"[{idx}/{total}] {img['filename']}: スキップ (既存ファイル)")
            continue

        print(f"[{idx}/{total}] {img['filename']} を生成中... ", flush=True)

        try:
            resp = client.images.generate(
                model="gpt-image-1",
                prompt=img["prompt"],
                size=img["size"],
                quality="high",
                n=1,
            )
        except Exception as e:
            print(f"  ✗ 失敗: {e}")
            continue

        b64 = resp.data[0].b64_json
        if not b64:
            print(f"  ✗ レスポンスに画像データなし")
            continue

        out_path.write_bytes(base64.b64decode(b64))
        size_kb = out_path.stat().st_size / 1024
        print(f"  ✓ 保存: {out_path.relative_to(ROOT)} ({size_kb:.0f} KB)")

    print()
    print(f"✓ 完了。出力先: {OUTPUT_DIR.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
