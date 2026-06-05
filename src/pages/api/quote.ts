import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json()
    const { name, phone, email, service, propertyType, bedrooms, postcode, preferredDate, message, sourcePage } = body

    if (!name || !phone || !service || !postcode) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400, headers: { 'Content-Type': 'application/json' }
      })
    }

    const db = (locals as any).runtime?.env?.DB
    if (!db) {
      return new Response(JSON.stringify({ success: false, error: 'Database unavailable' }), {
        status: 500, headers: { 'Content-Type': 'application/json' }
      })
    }

    const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || ''

    await db.prepare(
      `INSERT INTO leads (name, phone, email, service, property_type, bedrooms, postcode, preferred_date, message, source_page, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(name, phone, email || '', service, propertyType || '', bedrooms || '', postcode, preferredDate || '', message || '', sourcePage || '', ip).run()

    return new Response(JSON.stringify({ success: true, message: 'Thank you! We will be in touch shortly.' }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    })
  }
}
