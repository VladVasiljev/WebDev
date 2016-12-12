<?xml version="1.0" encoding="UTF-8" ?>
<xsl:transform 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" doctype-public="XSLT-compat" omit-xml-declaration="yes" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html>
            <head>
                <title>Bikes Stock and Cost</title>
            </head>
            <body>
                <h2>Types of Bikes We Offer</h2>
                <table border="1">
                    <tr bgcolor="#9acd32">
                        <th>Type</th>
                        <th>Colour</th>
                        <th>Hire Time</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                    <xsl:for-each select="/catalog/bikes">
                        <tr>
                            <td>
                                <xsl:value-of select="Type"/>
                            </td>
                            <td>
                                <xsl:value-of select="colour"/>
                            </td>
                            <td>
                                <xsl:value-of select="hireTime"/>
                            </td>
                            <td>
                                <xsl:value-of select="price"/>
                            </td> 
                            <td><xsl:value-of select="stock/quantity"/></td>
                            </tr>
				</xsl:for-each>
                </table>       
                




                </body>
		</html>
	</xsl:template>
	
</xsl:transform>                                                                         