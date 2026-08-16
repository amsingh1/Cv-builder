import { useLayoutEffect, useRef, useState } from 'react'
import { CVData } from '../../types'
import { CVPreview } from './CVPreview'

/**
 * Renders the A4 CVPreview at whatever width its container has, by measuring
 * the preview's true (unscaled) size and applying a CSS transform to fit —
 * so it never needs horizontal scrolling on narrow screens. The scale
 * transform is neutralized in print CSS (see .preview-scale-shell /
 * .preview-scale-inner in index.css) so exported PDFs stay full size.
 */
export function ScaledPreview({ data }: { data: CVData }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [naturalHeight, setNaturalHeight] = useState(0)

  useLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    function recalc() {
      const containerWidth = outer!.clientWidth
      const naturalWidth = inner!.offsetWidth
      setNaturalHeight(inner!.offsetHeight)
      if (naturalWidth > 0 && containerWidth > 0) {
        setScale(Math.min(1, containerWidth / naturalWidth))
      }
    }

    recalc()
    const ro = new ResizeObserver(recalc)
    ro.observe(outer)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={outerRef}
      className="preview-scale-shell flex items-start justify-center overflow-hidden"
      style={{ height: naturalHeight ? naturalHeight * scale : undefined }}
    >
      <div
        ref={innerRef}
        className="preview-scale-inner"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        <CVPreview data={data} />
      </div>
    </div>
  )
}
