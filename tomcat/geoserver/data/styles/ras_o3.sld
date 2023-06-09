<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld
http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" version="1.0.0">
  <NamedLayer>
    <Name></Name>
    <UserStyle>
      <Title>A raster style</Title>
      <FeatureTypeStyle>
        <Rule>
          <RasterSymbolizer>
            <ColorMap type="intervals" extended="true">
               <ColorMapEntry color="#3cccff" quantity="15" label="0-15" opacity="0.8"/>
              <ColorMapEntry color="#0d74ba" quantity="35" label="15-35" opacity="0.8"/>
              <ColorMapEntry color="#92d051" quantity="50" label="36-50" opacity="0.8"/>
              <ColorMapEntry color="#ffff00" quantity="70" label="51-70" opacity="0.8"/>
              <ColorMapEntry color="#fda102" quantity="120" label="71-120" opacity="0.8"/>
              <ColorMapEntry color="#fd3c3a" quantity="500" label=">121" opacity="0.8"/>
      		</ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>